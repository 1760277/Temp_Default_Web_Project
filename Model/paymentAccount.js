
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const CUSTOM = require('./custom')
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class PaymentAccount extends MODEL{

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