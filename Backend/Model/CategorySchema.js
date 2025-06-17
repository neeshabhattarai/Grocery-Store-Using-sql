const Sequelize=require('sequelize');
const sequelize=require('../Model/Database');
const CategoryModel=sequelize.define('category',{
     cat_id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false, 
             
        },
});
module.exports=CategoryModel;
