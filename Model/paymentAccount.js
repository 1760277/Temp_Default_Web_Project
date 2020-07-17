
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const CUSTOM = require('./custom')
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class PaymentAccount extends MODEL{

    static async findbyAccountNumber(accountNumber){
        return PaymentAccount.findOne(accountNumber);
    }
    static async createPaymentAccount(accountNumber,bankAddress,currentBalance,availableBalance){
        return PaymentAccount.create({
            accountNumber:accountNumber,
            status:true,
            bankAddress:bankAddress,
            currentBalance:currentBalance,
            availableBalance:availableBalance
        })
    }
    static async updateBalace(currentBalance,availableBalance,accountNumber){
        return PaymentAccount.update({
            currentBalance:currentBalance,
            availableBalance:availableBalance,
        },{where:{
            accountNumber:accountNumber
        }
    })
    }
    static async updateStatus(accountNumber){
        return PaymentAccount.update({
            status:false,
        },{
            where: {
                accountNumber:accountNumber,
            }
        })
    }

  }
 PaymentAccount.init({   
    accountNumber:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
    }, 
    status: {
        type: SEQUELIZE.BOOLEAN,
        allowNull: false,
    },  
    bankAddress: {
        type: SEQUELIZE.BOOLEAN,
        allowNull: false,
    },     
    currentBalance: {
        type: SEQUELIZE.DECIMAL,
        allowNull: false,
    },
    availableBalance: {
        type: SEQUELIZE.DECIMAL,
        allowNull: false,
    },    
    
},{
        sequelize: DB,
        modelName: 'paymentAccount',
 });
// PaymentAccount.belongsTo(CUSTOM)
module.exports = PaymentAccount;