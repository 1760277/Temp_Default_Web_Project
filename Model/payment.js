const SEQUELIZE = require('sequelize');
const DB = require('./db');
const { Op } = require("sequelize");
const MODEL = SEQUELIZE.Model;

class Payment extends MODEL{
   
    static async findByNumberAccount(accountNumberSend,accountNumberReceive,moneyDeposit){
        return Payment.findOne({
            where:{
                accountNumberSend,
                accountNumberReceive,
                moneyDeposit:moneyDeposit,
            }
        })
    }
    static async findpaymentByAccount(accountNumber){
        return Payment.findAll({
            where:{
                [Op.or]:[{
                    accountNumberSend: accountNumber
                },{
                    accountNumberReceive:accountNumber
                }
                ]
            }
        })
    }
    static async findById(id){
        return Payment.findByPk(id);
    }
    static async findByPaymentId(paymentId){
        return Payment.findOne({
            where:{
                paymentId,
            }
        })
    }
    static async findAllPayment(){
        return Payment.findAll()
    }
    static async createPaymentInBank(accountNumberSend,accountNumberReceive,nameCustomReceive,moneyDeposit,OTP){
        return Payment.create({
            accountNumberSend:accountNumberSend,
            accountNumberReceive:accountNumberReceive,
            nameCustomReceive:nameCustomReceive,
            moneyDeposit:moneyDeposit,
            OTP:OTP
        })
    }
    static async createPaymentOutBank(accountNumberSend,accountNumberReceive,nameCustomReceive,bankReceive,moneyDeposit,OTP){
        return Payment.create({
            accountNumberSend:accountNumberSend,
            accountNumberReceive:accountNumberReceive,
            nameCustomReceive: nameCustomReceive,
            bankReceive: bankReceive,
            moneyDeposit:moneyDeposit,
            OTP:OTP
        })
    }
    
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
        allowNull: true,
    },  
    bankReceive:{
        type: SEQUELIZE.STRING,
        defaultValue:'KHTN',
        allowNull: true,
    },
    moneyDeposit:{
        type: SEQUELIZE.DECIMAL,
        allowNull: false,
    }, 
    OTP:{
        type: SEQUELIZE.STRING,
        allowNull: true,
    }, 
},{
        sequelize: DB,
        modelName: 'payment',
 });
// PaymentAccount.belongsTo(CUSTOM)
module.exports = Payment;