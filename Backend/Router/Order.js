const express=require('express');
const Router=express.Router();
const Order=require('../Controller/Order');
const AuthUser=require('../Authentication/Auth');

Router.use(AuthUser);
Router.get('/',Order.GetOrder);
Router.get('/list',Order.GetAllOrder);
Router.post('/:id',Order.PostOrder);

Router.delete('/all',Order.DeleteOrder);
Router.get('/recommend',Order.Reccomendation)


module.exports=Router;