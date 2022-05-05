const express = require('express');
require('dotenv').config();
const mongoose= require('mongoose');
const app = express();

const connectDb= require('./dbConn');

connectDb();
const conn= mongoose.connection;




if(!conn){
    console.log('Houve um erro ao conectar ao banco de dados')
}else{
 
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on ${process.env.PORT}` );
    })

}
