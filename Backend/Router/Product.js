const HttpError=require('../Helper/HttpError');
const express=require('express');
const {check, body}=require('express-validator');
const ProductController=require('../Controller/Product');
const AuthUser=require('../Authentication/Auth');
const fileUpload = require('../Product');
const Router=express.Router();

Router.get('/',ProductController.GetProduct);
Router.get('/recommend',ProductController.GetReccomendation);
Router.use(AuthUser);
Router.patch('/:id',fileUpload.single("image"),ProductController.PatchProduct);

Router.delete('/:id',ProductController.DeleteProduct);

Router.post('/',fileUpload.single("image"),[
    check('name').not().isEmpty().withMessage("Name should not be empty").isLength({min:3}).withMessage("Name should be greater than 4 letter"),
   
],ProductController.PostProduct);


module.exports=Router;

