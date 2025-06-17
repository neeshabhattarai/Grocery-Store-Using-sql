const Sequelize=require('sequelize');
const sequelize=require('../Model/Database');
const ProductModel=sequelize.define('product',{
    pro_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,   
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    },
    oldPrice:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    description:{
        type:Sequelize.STRING
    }
   
});
module.exports=ProductModel;