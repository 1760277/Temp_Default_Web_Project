
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class Custom extends MODEL{
   static async findById(id) {
        return Custom.findByPk(id);
    } ;
      
    static async findByUsername(userName) {
        return Custom.findOne({
            where: {
                userName
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

    static async changePassword(id, curentPassword, newPassword){
        const user = await this.findById(id);
        if(this.verifyPassWord(curentPassword,user.passWord))
        {
            Custom.update(
                {
                    passWord: this.hashPassWord(newPassword)
                },{
                    id:id
                });
            
            return true;
        }
        else   
        {
            return false;
        }
    };

 }
 Custom.init({
    userName:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
        primarykey: true
    },    
    passWord: {
        type: SEQUELIZE.STRING,
        // allowNull: false,
    }, 
    email:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
    },
    token: {
        type: SEQUELIZE.STRING,
    },
    accountNumber:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
    },    
},{
        sequelize: DB,
        modelName: 'custom',
 });

module.exports = Custom;