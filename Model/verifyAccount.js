const SEQUELIZE = require('sequelize');
const DB = require('./db');
const { verifyPassWord } = require('./custom');
const MODEL = SEQUELIZE.Model;

class VerifyAccount extends MODEL{

    static async createDefault(userID, fullName,address,numberNationID,addressRange ) {
        
        return VerifyAccount.create(
            {
                userID: userID,
                fullName : fullName,
                address: address,
                numberNationID:  numberNationID,                
                addressRange: addressRange,
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

                where : {userID: id}
            });
    };
    
    static async updateStatus(id)
    {
        verifyPassWord.update({
            status : true
        },
        {
            where : { userID : id}
        });
    };

    static async updateRequest(id)
    {
        verifyPassWord.update({
            requestVerify : true
        },
        {
            where : { userID : id}
        });
    }
    
    static async findInfoByUserId(userID){
        return VerifyAccount.findOne({
            where: userID,
        })
    }
    static async findAllVerifyAccount(){
        return VerifyAccount.findAll();
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
        type: SEQUELIZE.DATEONLY,
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
        type: SEQUELIZE.DATEONLY,
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
    requestVerify:{
        type: SEQUELIZE.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    }
},{
        sequelize: DB,
        modelName: 'verifyAccount',
 });
// PaymentAccount.belongsTo(CUSTOM)
module.exports = VerifyAccount;