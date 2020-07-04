
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class Custom extends MODEL{
   static async findById(id) {
        return Custom.findByPk(id);
    }   
    static async findByEmail(email) {
        return Custom.findOne({
            where: {
                email 
            }
        });
    };    
    static async findByAccountNumber(accountNumber){
        return Custom.findOne({
            where: { 
                accountNumber
            }
        });
    };
     static  hashPassWord(password) {
        return BCRYPT.hashSync(password, 10);
    };
    
    static  verifyPassWord(password, passwordHash) {
        return BCRYPT.compareSync(password, passwordHash)
    };

    static async getAllCustom(){
        return Custom.findAll();
    };
  
    static async createCustom(accountNumber,email,password,fullName,token){
        return Custom.create({
            accountNumber: accountNumber,           
            email:email,
            password:password,
            fullName:fullName,
            token:token,
        });
    };

 }
 Custom.init({
    accountNumber:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
    },    
    email:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
    },    
    password: {
        type: SEQUELIZE.STRING,
        // allowNull: false,
    },
    fullName: {
        type: SEQUELIZE.STRING,
     
    },    
    cmnd:{
        type: SEQUELIZE.STRING,
     
    },
    token: {
        type: SEQUELIZE.STRING,
    },
    birthDate:{
        type: SEQUELIZE.STRING,
    },
    address:{
        type: SEQUELIZE.STRING,
    }
},{
        sequelize: DB,
        modelName: 'custom',
 });

module.exports = Custom;