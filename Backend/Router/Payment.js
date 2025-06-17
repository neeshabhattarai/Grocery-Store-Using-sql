const express=require('express');
const Router=express.Router();
const Payment=require('../Controller/Payment');
const AuthUser=require('../Authentication/Auth');
Router.get('/success',Payment.PaymentSuccess);
Router.use(AuthUser);
Router.post('/',Payment.PaymentRegister);
Router.get('/',Payment.PaymentDetails);
Router.post('/stripe',Payment.PaymentByStripe);




module.exports=Router;