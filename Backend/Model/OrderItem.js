const sequelize=require('./Database');
const Sequelize=require('sequelize');
const OrederItemSchema=sequelize.define('orderItem',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    transactionid:{
        type:Sequelize.STRING,
        allowNull:false
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    rating:{
        type:Sequelize.INTEGER
    }
})
module.exports=OrederItemSchema;