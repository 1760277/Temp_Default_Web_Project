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
            where:{
                userName,
            }
        })
        };

    static async findByEmail(email){
        return Custom.findOne({
            where:{
                email,
            }
        })
    }
    static async findByAccountNumber(accountNumber){
        return Custom.findOne({
            where: { 
                accountNumber
            }
        });
    };

    static hashPassWord(passWord) {
        return BCRYPT.hashSync(passWord, 10);
    };
    
    static verifyPassWord(passWord, hashPassWord) {
        return BCRYPT.compareSync(passWord, hashPassWord)
    };

    static async getAllCustom(){
        return Custom.findAll();
    };
  
    static async createCustom(userName,password,email,token,accountNumber){
        return Custom.create({
            userName:userName,  
            passWord:password,        
            email:email,            
            token:token,
            accountNumber: accountNumber, 
        });
    };

    /*static async changePassword(id, curentPassword, newPassword){
        const user = await this.findById(id);
        if(this.verifyPassWord(curentPassword,user.passWord))
        {
            Custom.update(
                {
                    passWord: this.hashPassWord(newPassword)
                },  
                {
                    where : { id = id}
                });
            
            return true;
        }
        else   
        {
            return false;
        }
    };*/

 }
 Custom.init({
    userName:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
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