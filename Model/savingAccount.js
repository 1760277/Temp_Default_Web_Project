
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const CUSTOM = require('./custom')
const DB = require('./db');
const { NOW } = require('sequelize');
const MODEL = SEQUELIZE.Model;

class SavingAccount extends MODEL{

  }
 SavingAccount.init({   
    savingAccountNumber:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
    }, 
    status: {
        type: SEQUELIZE.BOOLEAN,
        allowNull: false,
    },  
    accountType: {
        type: SEQUELIZE.BOOLEAN,
        allowNull: false,
    },
    moneySending: {
        type: SEQUELIZE.DECIMAL,
        allowNull: false,
    },
    moneyReceive: {
        type: SEQUELIZE.DECIMAL,
        allowNull: false,
    },
    interestRate: {
        type: SEQUELIZE.DECIMAL,
        allowNull: false,
    },
    openDate: {
        type: SEQUELIZE.DATE,
        allowNull: false,
        defaultValue: NOW(),
    },
    closeDate: {
        type: SEQUELIZE.DATE,
        allowNull: false,
    },
    staffId: {
        type: SEQUELIZE.INTEGER,
        allowNull: true,
    }
},{
        sequelize: DB,
        modelName: 'savingAccount',
 });

 module.exports = SavingAccount;