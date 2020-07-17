const SEQUELIZE = require('sequelize');
const DB = require('./db');
const MODEL = SEQUELIZE.Model;

class DetailsPayment extends MODEL{
   
    static async findAllbyDatePayment(datePayment){
        return  DetailsPayment.findAll(datePayment);
    }
    static async createDetalsPayment(datePayment,codePayment,availableBalance,moneyDeposit,contentPayment,status){
        return DetailsPayment.create({
         datePayment:datePayment,
         codePayment:codePayment,
         availableBalance:availableBalance,
         moneyDeposit:moneyDeposit,
         contentPayment:contentPayment,
         status:status
        });
    }
    static async finallDetailsPayment(){
        return DetailsPayment.findAll();
    }
    
  }
  DetailsPayment.init({   
    datePayment:{
        type: SEQUELIZE.DATE,
        allowNull: false,
    },       
    codePayment:{
        type: SEQUELIZE.STRING,
        allowNull: false,
    },       
    availableBalance:{
        type: SEQUELIZE.DECIMAL,
        allowNull:  false,
    },  
    moneyDeposit:{
        type: SEQUELIZE.DECIMAL,
        allowNull: false,
    }, 
    contentPayment:{
        type: SEQUELIZE.STRING,
        allowNull: false,
    },
    status:{
        type: SEQUELIZE.STRING,
        allowNull: false,
    },
},{
        sequelize: DB,
        modelName: 'detailsPayment',
 });
// PaymentAccount.belongsTo(CUSTOM)
module.exports = DetailsPayment;