const sequelize=require('./Database');
const Sequelize=require("sequelize");
const Payment=sequelize.define("payment",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    transactionId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    amount:{
        type:Sequelize.STRING,
        allowNull:false
    },
    method:Sequelize.STRING
    
   
})
module.exports=Payment;