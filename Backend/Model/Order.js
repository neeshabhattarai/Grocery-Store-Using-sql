const sequelize=require('./Database');
const Sequelize=require('sequelize');
const OrederSchema=sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    }
})
module.exports=OrederSchema;