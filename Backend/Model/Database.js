const {Sequelize}=require('sequelize');
const sequelize=new Sequelize('Your Database','username','password',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize;
