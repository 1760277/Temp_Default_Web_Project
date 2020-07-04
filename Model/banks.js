
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class Banks extends MODEL{
   static async findBanhkByCode(bankCode) {
        return Banks.findOne({
            where:
                 bankCode
    });
  }  
}

 Banks.init({       
    bankCode: {
        type: SEQUELIZE.STRING,        
        allowNull: false,        
    }, 
    bankName: {
        type: SEQUELIZE.STRING,
        allowNull: false,        
    },
    
},{
        sequelize: DB,
        modelName: 'banks',
});
module.exports = Banks;