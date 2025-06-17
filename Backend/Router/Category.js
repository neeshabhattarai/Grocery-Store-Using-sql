const HttpError=require('../Helper/HttpError');
const express=require('express');
const {check, body}=require('express-validator');
const CategoryController=require('../Controller/Category');
const AuthUser=require('../Authentication/Auth');
const Router=express.Router();
// Router.get('/');

Router.get('/',CategoryController.GetProduct);
// Router.use(AuthUser);
Router.post('/',[
    check('name').not().isEmpty().withMessage("Name should not be empty")
   
],CategoryController.PostCategory);
Router.get("/list",CategoryController.GetCategory);
Router.delete("/:id",CategoryController.DeleteCategory);
Router.patch("/:id",CategoryController.PatchCategory);
module.exports=Router;
