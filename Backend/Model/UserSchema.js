const Sequelize=require('sequelize');
const sequelize=require('../Model/Database');
const UserModel=sequelize.define('user',{
userid:{
    type:Sequelize.UUID,
   primaryKey:true
},
role:{
    type:Sequelize.STRING,
    allowNull:false,
},
name:{
    type:Sequelize.STRING,
    allowNull:false,   
},
email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
},
contact:{
    type:Sequelize.BIGINT,
    allowNull:false
},
password:{
    type:Sequelize.TEXT,
    allowNull:false
},
image:{
    type:Sequelize.STRING,
    allowNull:false
},
})
module.exports=UserModel;