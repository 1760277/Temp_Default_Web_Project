const {Router} = require('express');
const ASYNC_HANDLER = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const CRYPTO = require('crypto');
var BIGUINT = require('biguint-format');

const STAFF = require('../../Model/staff');
const CUSTOMER = require('../../Model/custom');
const SAVING_ACCOUNT = require('../../Model/savingAccount');
const EMAIL = require('../../Model/email');
const { quarterlyInterestRate_Limited } = require('../../Model/savingAccount');

const ROUTER = new Router();

ROUTER.get('/', function getRegisterCustomer(req, res){
    if (req.currentCustom != null){
        res.render('Saving_Account');
    }
    else {
        res.render('Index');
    }
});
ROUTER.post('/',[
    body('period')
        .isInt()
        .notEmpty(),
    body('moneySending')
        .isDecimal()
        .notEmpty(),
], ASYNC_HANDLER( async function(req, res){
    const errors = validationResult(req) ;
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(422).render('Saving_Account',{errors: errors.array()});
    }

    if (req.body.selectpicker_type == 'Quarterly'){
        if (req.body.selectpicker_period == 'Month'){
            const accountType = true;
            const interestRate = SAVING_ACCOUNT.quarterlyInterestRate_Limited(req.body.moneySending, parseInt(req.body.period, 10));

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1 + parseInt(req.body.period, 10);
            var Year = now.getFullYear();

            while (Month > 12){
                Month = Month - 12;
                Year = Year + 1;
            }

            const closeDate = new Date(Year, Month, Day);

            const savingAccountNumber = req.currentCustom;

            const savingAccount = SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber);
        }
        else {
            const accountType = true;
            const interestRate = SAVING_ACCOUNT.yearInterestRate_Limited(req.body.moneySending, parseInt(req.body.period, 10));

            const savingAccountNumber = req.currentCustom;

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1;
            var Year = now.getFullYear() + parseInt(req.body.period, 10);

            const closeDate = new Date(Year, Month, Day);

            const savingAccount = SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber);
        }
    }
    else if (req.body.selectpicker_type == 'Limited'){
        if (req.body.selectpicker_period == 'Month'){

        }
        else {
            
        }
    }
    else {
        if (req.body.selectpicker_period == 'Month'){

        }
        else {
            
        }
    }

    /*const acNum='10000'+BIGUINT(CRYPTO.randomBytes(2), 'dec');
    const hassPass=await CUSTOMER.hashPassWord(req.body.password);
    const toke=CRYPTO.randomBytes(3).toString('hex').toUpperCase();
    const customer=await CUSTOMER.createCustom(acNum,req.body.userName,req.body.email,hassPass,req.body.fullName,toke)
    console.log(customer)
    await EMAIL.send(customer.email, 'Mã kích hoạt tài khoản',`http://localhost:3000/login/${customer.id}/${customer.token}`);
    const custom=await CUSTOMER.findByEmail(req.body.email);*/

    //console.log(req.body.selectpicker_type);
    //console.log(req.body.selectpicker_period);
    
    res.redirect('/savingAccount');
}));

/*ROUTER.get('/auto-create',ASYNC_HANDLER(async function(req,res){
    for (var index = 0; index < 100; index++) {
        const hashPassword = await STAFF.hashPassWord('1');
        const staff = await STAFF.createStaff("staff_"+index+"@gmail.com", hashPassword, "BB staff " + index, "0");    
    
        const customer=await CUSTOMER.createCustom("BB"+(10000+index),"Custom_"+index +"@gamil.com",hashPassword,"BB Custom" + index,"")
    }
}));*/

module.exports = ROUTER;