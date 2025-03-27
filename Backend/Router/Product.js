const HttpError=require('../Helper/HttpError');
const express=require('express');
const Router=express.Router();
// Router.get('/');
Router.get('/',(req,res,next)=>{
    const Error=new HttpError("Requested url not found",404);
    return next(Error);
})
module.exports=Router;
