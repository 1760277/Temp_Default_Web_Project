
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const CUSTOM = require('./custom')
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class InterestRate extends MODEL{
    static async findById(id) {
        return InterestRate.findByPk(id);
    }

    static async createCurrency(){
        return InterestRate.create({
            
        });
    };

  }
 InterestRate.init({
     moneySending: {
        type: SEQUELIZE.DECIMAL,
        allowNull: false,
     },
}, {
        sequelize: DB,
        modelName: 'interestrate',
});

module.exports = InterestRate;