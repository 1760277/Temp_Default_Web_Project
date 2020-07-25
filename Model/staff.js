
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class Staff extends MODEL{

   static async findById(id) {
        return Staff.findByPk(id);
    };

    static async findByEmail(email) {
        return Staff.findOne({
            where: {
                email 
            }
        });
    };  

    static async findByUserName(userName) {
        return Staff.findOne({
            where: {
                userName 
            }
        });
    };

    static  hashPassWord(password) {
        return BCRYPT.hashSync(password,10);
    };
    
    static  verifyPassWord(password, passwordHash) {
        return BCRYPT.compareSync(password, passwordHash)
    }; 

    static  async getAllStaff() {
        return Staff.findAll();
    }; 

    static async changePassword(id, currentPassword, newPassword)
    {
        const user=  await this.findById(id);
        if(this.verifyPassWord(currentPassword, user.password))
        {
            Staff.update(
                {
                    password : this.hashPassWord(newPassword)
                },
                {
                    where : { id : id}
                }
            )    
        }
        else
        {
            return false;
        }
        
    }

    static async createStaff( email, password, userName,fullName, officeBank){
        return Staff.create({           
            email: email,
            password: password,
            userName:userName,
            fullName: fullName,
            officeBankId: officeBank,
        })
    };

    static async updateStaff(id, fullName, email, officeBank){
        return Staff.update({
            fullName: fullName,
            email: email,
            officeBankId: officeBank,            
        }, 
        {
            where: {id :id}
        })
    };


 }
 
 Staff.init({
    userName:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
    },
    email:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
    },
    fullName: {
        type: SEQUELIZE.STRING,
        allowNull: true,
    },
    password: {
        type: SEQUELIZE.STRING,    
    },
    officeBankId: {
        type: SEQUELIZE.STRING,
        //allowNull: true,       
    },        
},{
        sequelize: DB,
        modelName: 'staff',   
});

module.exports = Staff;