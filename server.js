const express = require('express');
require('dotenv').config();
const mongoose= require('mongoose');
const app = express();

// import categories router
const categoriesRoutes = require('./routes/categories');



//ler os corpos da requisição
app.use(express.json());
// importar os models
app.use('/api/categories',categoriesRoutes);








app.use((req,res,next)=>{
    console.log('hey middleware')
    next();
})









app.get('/',(req,res)=>{
    res.send("Hello World 2");
})






app.use((err,req,res,next)=>{
    console.log(err.message);
    res.status(500).json({error:err.message});
})


const connect = async ()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
              
            });
        const conn= mongoose.connection;
        console.log(`MongoDB Connected: ${conn.name}`);
        return conn;
    }catch(err){
        console.log(err.message);
    }
}




const listen = async ()=>{
  const conn=await connect();
  if(conn){

      app.listen(process.env.PORT,()=>{
          console.log('⭕ Connected Successfully');
      })
  }else{

      console.log('⚡ ERRO AO CONECTAR ⚠')
  }
}

listen();















