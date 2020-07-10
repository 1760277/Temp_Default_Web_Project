
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class Banks extends MODEL{

   static async findBankByCode(bankCode) {
        return Banks.findOne({
            where: bankCode
    });
  }  ;

  static async getAllBank()
  {
      return Banks.findAll();
  };

  static async createBanks(bankCode,Name )
  {
    Banks.create(
        {
            bankCode: bankCode,
            bankName: Name,
        }
    )
  };
}

 Banks.init({       
    bankCode: {
        type: SEQUELIZE.STRING,        
        allowNull: false,
        primaryKey: true ,      
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