
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const CUSTOM = require('./custom')
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class Currency extends MODEL{
    static async findById(id) {
        return Currency.findByPk(id);
    }

    static async createCurrency(){
        return Currency.create({
            
        });
    };

  }
 Currency.init({
    foreignCurrency: {
        type: SEQUELIZE.STRING,
        allowNull: false,
    },
    domesticCurrency: {
        type: SEQUELIZE.STRING,
        allowNull: false,
    }
}, {
        sequelize: DB,
        modelName: 'currency',
});

module.exports = Currency;