const SEQUELIZE = require('sequelize');
const DB = require('./db');
const PAYMENT = require('./payment');
const STAFF = require('./staff');
const MODEL = SEQUELIZE.Model;

class DetailsPayment extends MODEL{
   
    static async findAllbyDatePayment(datePayment){
        return  DetailsPayment.findAll(datePayment);
    }
    static async createDetalsPayment(codePayment,availableBalance,moneyDeposit,contentPayment,paymentId){
        return DetailsPayment.create({
         codePayment:codePayment,
         availableBalance:availableBalance,
         moneyDeposit:moneyDeposit,
         contentPayment:contentPayment,
         paymentId: paymentId,
        });
    }
    static async finallDetailsPayment(){
        return DetailsPayment.findAll();
    }
    static async updatedetailsPyament(paymentId,staffId){
        return DetailsPayment.update({
            status: true,
            staffId:staffId,
        },{
            where:{
                paymentId:paymentId,
            }
        })
    }
  }
  DetailsPayment.init({          
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
        defaultValue:false,
        allowNull: false,
    },
},{
        sequelize: DB,
        modelName: 'detailsPayment',
 });
PAYMENT.hasMany(DetailsPayment);
DetailsPayment.belongsTo(PAYMENT)
STAFF.hasMany(DetailsPayment);
DetailsPayment.belongsTo(STAFF);

module.exports = DetailsPayment;