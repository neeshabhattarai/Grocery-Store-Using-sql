const express=require('express');
const {check}=require('express-validator');
const UserController=require('../Controller/User');
const AuthUser=require('../Authentication/Auth');
const Router=express.Router();
const fileUpload=require("../Product");
Router.get('/',UserController.GetAllUser);
Router.post('/signup',fileUpload.single("image"),[check('name').not().isEmpty().withMessage("Name cant be null").isLength({min:3}).withMessage("It needs to be more than 3 character")
,check('email').not().isEmpty().withMessage("Email cant be null").isLength({min:4}).withMessage("Minimun 5 character is needed"),check('password').not().isEmpty().withMessage("Password cant be null")
],UserController.CreateUser);
Router.post('/login',UserController.LoginUser);
Router.patch('/:id',fileUpload.single("image"),UserController.Updateuser);
// Router.patch('/update',UserController.UpdateUser);
Router.delete('/delete/:userid',UserController.DeleteUser);
Router.use(AuthUser);
Router.get('/:id',UserController.GetUser);

module.exports=Router;

