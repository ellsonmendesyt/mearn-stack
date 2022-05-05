const express = require('express');
require('dotenv').config();
const mongoose= require('mongoose');
const app = express();

//ler os corpos da requisição
app.use(express.json());
// importar os models
const Category = require('./models/category');








app.use((req,res,next)=>{
    console.log('hey middleware')
    next();
})









app.get('/',(req,res)=>{
    res.send("Hello World 2");
})



app.get('/api/categories',async (req,res,next)=>{
  try {
      const categories= await Category.find();
      res.status(200).json({data:categories});
  } catch (error) {
      next(error)
  }
})




app.post('/api/categories',async (req,res,next)=>{

    try {
        const category =await new Category(req.body).save()
        res.status(200).json({data:category});
    } catch (error) {
        console.log('erro simples');
        next(error); //enviamos o error pra pro próximo middleware
    }
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















