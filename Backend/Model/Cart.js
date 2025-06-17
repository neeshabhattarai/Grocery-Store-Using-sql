const sequelize=require('./Database');
const Sequelize=require('sequelize');
const CartSchema=sequelize.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    }
})
module.exports=CartSchema;