const SEQUELIZE = require('sequelize');
const DB = require('./db');
const { verifyPassWord } = require('./custom');
const MODEL = SEQUELIZE.Model;

class VerifyAccount extends MODEL{

    static async createDefault(fullName) {
        
        return VerifyAccount.create(
            {
                fullName : fullName
            }
        )
    }  
     
    static async updateAccount(id,fullName, birthDate, address, frontNationID, behindNationID, dateRange, addressRange) {
        return VerifyAccount.update(
            {
                fullName: fullName,
                birthDate : birthDate,
                address: address,
                frontNationID: frontNationID,
                behindNationID: behindNationID,
                dateRange: dateRange,
                addressRange: addressRange,
                status : false,
            },{

                userID: id
            });
    };
    
    static async updateStatus(id)
    {
        verifyPassWord.update({
            status : true
        },
        {
            userID: id
        });
    }

  }
  VerifyAccount.init({   
    userID:{
        type: SEQUELIZE.STRING,
        allowNull: false,
    },       
    fullName:{
        type: SEQUELIZE.STRING,
        allowNull: false,
    },       
    birthDate:{
        type: SEQUELIZE.DATE,
        allowNull: true,
    },       
    address:{
        type: SEQUELIZE.STRING,
        allowNull: true,
    },  
    frontNationID:{
        type: SEQUELIZE.BLOB,
        allowNull: true,
    },
    behindNationID:{
        type: SEQUELIZE.BLOB,
        allowNull: true,
    },
    numberNationID:{
        type: SEQUELIZE.STRING,
        allowNull: true,
    },
    dateRange:{
        type: SEQUELIZE.DATE,
        allowNull: true,
    },
    addressRange:{
        type: SEQUELIZE.STRING,
        allowNull: true,
    },
    status:{
        type: SEQUELIZE.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
},{
        sequelize: DB,
        modelName: 'verifyAccount',
 });
// PaymentAccount.belongsTo(CUSTOM)
module.exports = VerifyAccount;