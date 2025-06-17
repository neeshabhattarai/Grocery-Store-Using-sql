const sequelize=require('./Database');
const Sequelize=require('sequelize');
const CartItemSchema=sequelize.define('cartItem',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },  quantity:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        rating:{
            type:Sequelize.INTEGER,
            
        }
})
module.exports=CartItemSchema;