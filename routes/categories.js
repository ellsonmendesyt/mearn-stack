const express= require('express');
const Category = require('../models/category');

const router= express.Router();


router.get('/',async (req,res,next)=>{
    try {
        const categories= await Category.find();
        res.status(200).json({data:categories});
    } catch (error) {
        next(error)
    }
  })
  
  
  
  
  router.post('/',async (req,res,next)=>{
  
      try {
          const category =await new Category(req.body).save()
          res.status(200).json({data:category});
      } catch (error) {
          console.log('erro simples');
          next(error); //enviamos o error pra pro próximo middleware
      }
  })

  module.exports=router;