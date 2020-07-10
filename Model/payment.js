const SEQUELIZE = require('sequelize');
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class Payment extends MODEL{
   
  }
 Payment.init({   
    accountNumberSend:{
        type: SEQUELIZE.STRING,
        allowNull: false,
    },       
    accountNumberReceive:{
        type: SEQUELIZE.STRING,
        allowNull: false,
    },       
    nameCustomReceive:{
        type: SEQUELIZE.STRING,
        allowNull: false,
    },  
    bankReceive:{
        type: SEQUELIZE.STRING,
        allowNull: false,
    }, 
    OTP:{
        type: SEQUELIZE.STRING,
        allowNull: false,
    }, 
},{
        sequelize: DB,
        modelName: 'payment',
 });
// PaymentAccount.belongsTo(CUSTOM)
module.exports = Payment;