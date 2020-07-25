const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const CUSTOM = require('./custom')
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class PaymentAccount extends MODEL{

    static async findbyAccountNumber(accountNumber){
        return PaymentAccount.findOne({
            where:{accountNumber}
        });
    }
    static async createPaymentAccount(accountNumber){
        return PaymentAccount.create({
            accountNumber:accountNumber,
        })
    }
    static async updateBalace(availableBalance,accountNumber){
        return PaymentAccount.update({
            availableBalance:availableBalance,
        },{
            where:{
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
        defaultValue: true,
        allowNull: false,
    },  
    brandBank: {
        type: SEQUELIZE.STRING,
        defaultValue:'KHTN',
        allowNull: false,
    },     
    availableBalance: {
        type: SEQUELIZE.DECIMAL,
        defaultValue:0,
        allowNull: false,
    },    
    
},{
        sequelize: DB,
        modelName: 'paymentAccount',
 });
// PaymentAccount.belongsTo(CUSTOM)
module.exports = PaymentAccount;