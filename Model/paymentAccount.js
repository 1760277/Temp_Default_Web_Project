
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const CUSTOM = require('./custom')
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class PaymentAccount extends MODEL{
   static async findById(id) {
        return PaymentAccount.findByPk(id);
    } 
    static async createPaymentAccount(status){
        return PaymentAccount.create({
            status: status,
        });
    };
  }
 PaymentAccount.init({   
    status: {
        type: SEQUELIZE.BOOLEAN,
        allowNull: false,
    },
    currency: {
        type: SEQUELIZE.STRING,
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