
const BCRYPT = require('bcrypt');
const SEQUELIZE = require('sequelize');
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class Staff extends MODEL{
   static async findById(id) {
        return Staff.findByPk(id);
    }   
    static async findByEmail(email) {
        return Staff.findOne({
            where: {
                email 
            }
        });
    };  
    static  hashPassWord(password) {
        return BCRYPT.hashSync(password,10);
    };
    
    static  verifyPassWord(password, passwordHash) {
        return BCRYPT.compareSync(password, passwordHash)
    }; 

    static  getAllStaff() {
        return Staff.findAll();
    }; 

    static async createStaff(email, password, fullName, officeBank){
        return Staff.create({
            email: email,
            permition: false,
            password: password,
            fullName: fullName,
            officeBank: officeBank,
        })
    }
 }
 Staff.init({
    email:{
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
    },
    fullName: {
        type: SEQUELIZE.STRING,
        allowNull: false,
    },
    password: {
        type: SEQUELIZE.STRING,    
    },
    birthDay: {
        type: SEQUELIZE.DATE,       
    },
    address: {
        type: SEQUELIZE.STRING,   
    },
    officeBank: {
        type: SEQUELIZE.STRING,
        allowNull: false,       
    },    
    permition: {
        type: SEQUELIZE.BOOLEAN,
        allowNull: false,
    },    
},{
        sequelize: DB,
        modelName: 'staff',   
});

module.exports = Staff;