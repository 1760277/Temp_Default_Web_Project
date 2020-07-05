
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const CUSTOM = require('./custom')
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class SavingAccount extends MODEL{
    static async findById(id) {
        return SavingAccount.findByPk(id);
    }

    static async findByAccountNumber(accountNumber){
        return SavingAccount.findOne({
            where: accountNumber,
        });
    }

    static async createSavingAccount(currency, moneySending, interestRate, closeDate){
        return SavingAccount.create({
            currency: currency,
            moneySending: moneySending,
            interestRate: interestRate,
            closeDate: closeDate,
        });
    };

  }
 SavingAccount.init({
    status: {
        type: SEQUELIZE.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    currency: {
        type: SEQUELIZE.STRING,
        allowNull: false,
    },
    moneySending: {
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
}, {
        sequelize: DB,
        modelName: 'savingAccount',
});
CUSTOM.hasMany(SavingAccount);
SavingAccount.belongsTo(CUSTOM);
module.exports = SavingAccount;