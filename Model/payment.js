const SEQUELIZE = require('sequelize');
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class Payment extends MODEL{
   
    static async createPayment(accountNumberSend,accountNumberReceive,nameCustomReceive,bankReceive,OTP){
        return Payment.create({
            accountNumberSend:accountNumberSend,
            accountNumberReceive:accountNumberReceive,
            nameCustomReceive: nameCustomReceive,
            bankReceive: bankReceive,
            OTP:OTP
        })
    }
    /*static async updateOTP(accountNumberSend){
        return Payment.update({
            OTP:null,
        },{
            where:{
                accountNumberSend:accountNumberSend,
            }
        })
    }*/
    
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