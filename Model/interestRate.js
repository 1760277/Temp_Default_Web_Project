
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const CUSTOM = require('./custom')
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class InterestRate extends MODEL{
    static async findById(id) {
        return InterestRate.findByPk(id);
    }

    static async interestRate(moneySending, period){
        if (moneySending < 200000000){
            if (period === 1){
                return 4.85;
            }
            else if (period === 2){
                return 5.05;
            }
            else if (period === 3){
                return 5.15;
            }
            else if (period === 6){
                return 5.85;
            }
            else if (period === 12){
                return 6.55;
            }
        }
        else if (moneySending >= 200000000 && moneySending < 500000000){
            if (period === 1){
                return 4.95;
            }
            else if (period === 2){
                return 5.15;
            }
            else if (period === 3){
                return 5.25;
            }
            else if (period === 6){
                return 5.95;
            }
            else if (period === 12){
                return 6.65;
            }
        }
        else if (moneySending >= 500000000 && moneySending < 1000000000){
            if (period === 1){
                return 5.00;
            }
            else if (period === 2){
                return 5.20;
            }
            else if (period === 3){
                return 5.30;
            }
            else if (period === 6){
                return 6.00;
            }
            else if (period === 12){
                return 6.70;
            }
        }
        else if (moneySending >= 1000000000 && moneySending < 5000000000){
            if (period === 1){
                return 5.05;
            }
            else if (period === 2){
                return 5.25;
            }
            else if (period === 3){
                return 5.35;
            }
            else if (period === 6){
                return 6.05;
            }
            else if (period === 12){
                return 6.75;
            }
        }
        else if (moneySending >= 5000000000 && moneySending < 10000000000){
            if (period === 1){
                return 5.10;
            }
            else if (period === 2){
                return 5.30;
            }
            else if (period === 3){
                return 5.40;
            }
            else if (period === 6){
                return 6.10;
            }
            else if (period === 12){
                return 6.80;
            }
        }
        else if (moneySending >= 10000000000){
            if (period === 1){
                return 5.15;
            }
            else if (period === 2){
                return 5.35;
            }
            else if (period === 3){
                return 5.45;
            }
            else if (period === 6){
                return 6.15;
            }
            else if (period === 12){
                return 6.85;
            }
        }
    }

    static async createInterestRate(moneySending, period){
        return InterestRate.create({
            moneySending: moneySending,
            period: period,
            interestRate: InterestRate.interestRate(moneySending, period),
        });
    };

  }
 InterestRate.init({
     moneySending: {
        type: SEQUELIZE.DECIMAL,
        allowNull: false,
     },
     period:{
        type: SEQUELIZE.INTEGER,
        allowNull: false,
     },
     interestRate: {    
        type: SEQUELIZE.DECIMAL,
        allowNull: false,
     },
}, {
        sequelize: DB,
        modelName: 'interestrate',
});

module.exports = InterestRate;