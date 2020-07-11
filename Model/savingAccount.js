
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const CUSTOM = require('./custom')
const DB = require('./db');
const { NOW } = require('sequelize');
const MODEL = SEQUELIZE.Model;

class SavingAccount extends MODEL{
    static async quarterlyInterestRate_Limited(moneySending, period){
        if (moneySending < 200000000){
            if (period >= 12 && period < 15){
                return 6.5;
            }
            else if (period >= 15 && period < 18){
                return 6.6;
            }
            else if (period >= 18 && period < 24){
                return 6.75;
            }
            else if (period >= 24){
                return 6.9;
            }
        }
        else if (moneySending >= 200000000 && moneySending < 500000000){
            if (period >= 12 && period < 15){
                return 6.6;
            }
            else if (period >= 15 && period < 18){
                return 6.7;
            }
            else if (period >= 18 && period < 24){
                return 6.85;
            }
            else if (period >= 24){
                return 7;
            }
        }
        else if (moneySending >= 500000000 && moneySending < 1000000000){
            if (period >= 12 && period < 15){
                return 6.65;
            }
            else if (period >= 15 && period < 18){
                return 6.75;
            }
            else if (period >= 18 && period < 24){
                return 6.9;
            }
            else if (period >= 24){
                return 7.05;
            }
        }
        else if (moneySending >= 1000000000 && moneySending < 5000000000){
            if (period >= 12 && period < 15){
                return 6.7;
            }
            else if (period >= 15 && period < 18){
                return 6.8;
            }
            else if (period >= 18 && period < 24){
                return 6.95;
            }
            else if (period >= 24){
                return 7.1;
            }
        }
        else if (moneySending >= 5000000000 && moneySending < 10000000000){
            if (period >= 12 && period < 15){
                return 6.75;
            }
            else if (period >= 15 && period < 18){
                return 6.85;
            }
            else if (period >= 18 && period < 24){
                return 7;
            }
            else if (period >= 24){
                return 7.15;
            }
        }
        else {
            if (period >= 12 && period < 15){
                return 6.8;
            }
            else if (period >= 15 && period < 18){
                return 6.9;
            }
            else if (period >= 18 && period < 24){
                return 7.05;
            }
            else if (period >= 24){
                return 7.2;
            }
        }
    }

    static async monthInterestRate_Limited(moneySending, period){
        if (moneySending < 200000000){
            if (period >= 2 && period < 6){
                return 4.9;
            }
            else if (period >= 6 && period < 9){
                return 6.4;
            }
            else if (period >= 9 && period < 12){
                return 6.45;
            }
            else if (period >= 12 && period < 13){
                return 6.75;
            }
            else if (period >= 13 && period < 15){
                return 6.8;
            }
            else if (period >= 15 && period < 18){
                return 7.05;
            }
            else if (period >= 18 && period < 24){
                return 7.2;
            }
            else if (period >= 24 && period < 36){
                return 7.3;
            }
            else {
                return 7.45;
            }
        }
        else if (moneySending >= 200000000 && moneySending < 500000000){
            if (period >= 2 && period < 6){
                return 4.9;
            }
            else if (period >= 6 && period < 9){
                return 6.5;
            }
            else if (period >= 9 && period < 12){
                return 6.55;
            }
            else if (period >= 12 && period < 13){
                return 6.85;
            }
            else if (period >= 13 && period < 15){
                return 6.8;
            }
            else if (period >= 15 && period < 18){
                return 7.1;
            }
            else if (period >= 18 && period < 24){
                return 7.25;
            }
            else if (period >= 24 && period < 36){
                return 7.4;
            }
            else {
                return 7.55;
            }
        }
        else if (moneySending >= 500000000 && moneySending < 1000000000){
            if (period >= 2 && period < 6){
                return 4.9;
            }
            else if (period >= 6 && period < 9){
                return 6.55;
            }
            else if (period >= 9 && period < 12){
                return 6.6;
            }
            else if (period >= 12 && period < 13){
                return 6.9;
            }
            else if (period >= 13 && period < 15){
                return 7;
            }
            else if (period >= 15 && period < 18){
                return 7.15;
            }
            else if (period >= 18 && period < 24){
                return 7.3;
            }
            else if (period >= 24 && period < 36){
                return 7.45;
            }
            else {
                return 7.6;
            }
        }
        else if (moneySending >= 1000000000 && moneySending < 5000000000){
            if (period >= 2 && period < 6){
                return 4.9;
            }
            else if (period >= 6 && period < 9){
                return 6.5;
            }
            else if (period >= 9 && period < 12){
                return 6.6;
            }
            else if (period >= 12 && period < 13){
                return 6.95;
            }
            else if (period >= 13 && period < 15){
                return 7.1;
            }
            else if (period >= 15 && period < 18){
                return 7.25;
            }
            else if (period >= 18 && period < 24){
                return 7.4;
            }
            else if (period >= 24 && period < 36){
                return 7.55;
            }
            else {
                return 7.55;
            }
        }
        else if (moneySending >= 5000000000 && moneySending < 10000000000){
            if (period >= 2 && period < 6){
                return 4.9;
            }
            else if (period >= 6 && period < 9){
                return 6.65;
            }
            else if (period >= 9 && period < 12){
                return 6.7;
            }
            else if (period >= 12 && period < 13){
                return 7;
            }
            else if (period >= 13 && period < 15){
                return 7.15;
            }
            else if (period >= 15 && period < 18){
                return 7.3;
            }
            else if (period >= 18 && period < 24){
                return 7.45;
            }
            else if (period >= 24 && period < 36){
                return 7.6;
            }
            else {
                return 7.75;
            }
        }
        else {
            if (period >= 2 && period < 6){
                return 4.9;
            }
            else if (period >= 6 && period < 9){
                return 6.7;
            }
            else if (period >= 9 && period < 12){
                return 6.75;
            }
            else if (period >= 12 && period < 13){
                return 7.05;
            }
            else if (period >= 13 && period < 15){
                return 7.25;
            }
            else if (period >= 15 && period < 18){
                return 7.4;
            }
            else if (period >= 18 && period < 24){
                return 7.55;
            }
            else if (period >= 24 && period < 36){
                return 7.7;
            }
            else {
                return 7.75;
            }
        }
    }
    static async yearInterestRate_Limited(moneySending, period){
        if (moneySending < 200000000){
            if (period >= 1 && period < 6){
                return 5;
            }
            else if (period >= 6 && period < 9){
                return 6.5;
            }
            else if (period >= 9 && period < 12){
                return 6.6;
            }
            else if (period >= 12 && period < 13){
                return 7;
            }
            else if (period >= 13 && period < 15){
                return 7.1;
            }
            else if (period >= 15 && period < 18){
                return 7.4;
            }
            else {
                return 7.6;
            }
            
        }
        else if (moneySending >= 200000000 && moneySending < 500000000){
            if (period >= 1 && period < 6){
                return 5;
            }
            else if (period >= 6 && period < 9){
                return 6.6;
            }
            else if (period >= 9 && period < 12){
                return 6.7;
            }
            else if (period >= 12 && period < 13){
                return 7.1;
            }
            else if (period >= 13 && period < 15){
                return 7.2;
            }
            else if (period >= 15 && period < 18){
                return 7.45;
            }
            else {
                return 7.65;
            }
        }
        else if (moneySending >= 500000000 && moneySending < 1000000000){
            if (period >= 1 && period < 6){
                return 5;
            }
            else if (period >= 6 && period < 9){
                return 6.65;
            }
            else if (period >= 9 && period < 12){
                return 6.75;
            }
            else if (period >= 12 && period < 13){
                return 7.15;
            }
            else if (period >= 13 && period < 15){
                return 7.25;
            }
            else if (period >= 15 && period < 18){
                return 7.5;
            }
            else {
                return 7.7;
            }
        }
        else if (moneySending >= 1000000000 && moneySending < 5000000000){
            if (period >= 1 && period < 6){
                return 5;
            }
            else if (period >= 6 && period < 9){
                return 6.7;
            }
            else if (period >= 9 && period < 12){
                return 6.8;
            }
            else if (period >= 12 && period < 13){
                return 7.2;
            }
            else if (period >= 13 && period < 15){
                return 7.3;
            }
            else if (period >= 15 && period < 18){
                return 7.55;
            }
            else {
                return 7.75;
            }
        }
        else if (moneySending >= 5000000000 && moneySending < 10000000000){
            if (period >= 1 && period < 6){
                return 5;
            }
            else if (period >= 6 && period < 9){
                return 6.75;
            }
            else if (period >= 9 && period < 12){
                return 6.85;
            }
            else if (period >= 12 && period < 13){
                return 7.25;
            }
            else if (period >= 13 && period < 15){
                return 7.35;
            }
            else if (period >= 15 && period < 18){
                return 7.6;
            }
            else {
                return 7.8;
            }
        }
        else {
            if (period >= 1 && period < 6){
                return 5;
            }
            else if (period >= 6 && period < 9){
                return 6.8;
            }
            else if (period >= 9 && period < 12){
                return 6.9;
            }
            else if (period >= 12 && period < 13){
                return 7.3;
            }
            else if (period >= 13 && period < 15){
                return 7.4;
            }
            else if (period >= 15 && period < 18){
                return 7.6;
            }
            else {
                return 7.8;
            }
        }
    }

    static async CreateSavingAccount(moneySending, interestRate, closeDate){
        return SavingAccount.create({
            moneySending: moneySending,
            interestRate: interestRate,
            closeDate: closeDate,
        });
    }
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