const HttpError=require('../Helper/HttpError');
const express=require('express');
const {check, body}=require('express-validator');
const CartController=require('../Controller/Cart');
const AuthUser=require('../Authentication/Auth');
const Router=express.Router();
Router.use(AuthUser);
Router.get("/all",CartController.GetAllCart);
Router.delete('/:id',CartController.DeleteCart);
Router.post("/payment",CartController.Payment);
Router.get('/',CartController.GetCart);
Router.post('/',[
    check('quantity').not().isEmpty().withMessage("Quantity should not be empty").isInt({min:1}).withMessage("Must be Atleast 1 ")
   
],CartController.PostCart);

module.exports=Router;
