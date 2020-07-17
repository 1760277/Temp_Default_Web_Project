const {Router} = require('express');
const ASYNC_HANDLER = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const CRYPTO = require('crypto');
var BIGUINT = require('biguint-format');

const STAFF = require('../Model/staff');
const CUSTOMER = require('../Model/custom');
const SAVING_ACCOUNT = require('../Model/savingAccount');
const EMAIL = require('../Model/email');
const { quarterlyInterestRate_Limited } = require('../Model/savingAccount');

const ROUTER = new Router();

ROUTER.get('/', function getRegisterCustomer(req, res){
    res.render('Saving_Account');
    /*if (req.currentCustom != null){
        
    }
    else {
        res.render('Index');
    }*/
});

ROUTER.post('/closeSavingAccount', function (req, res) {
    const savingAccount = SAVING_ACCOUNT.findById();

    savingAccount.accountType = false;
    savingAccount.save();
    res.redirect('/closeSavingAccount');
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

            const savingAccountNumber = req.currentCustom.accountNumber;

            const savingAccount = SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber);
            await EMAIL.send(req.currentCustom.email, 'Tai Khoan Tiet Kiem',`${savingAccount.accountType},${savingAccount.moneySending}`);
        }
        else {
            const accountType = true;
            const interestRate = SAVING_ACCOUNT.yearInterestRate_Limited(req.body.moneySending, parseInt(req.body.period, 10));

            const savingAccountNumber = req.currentCustom.accountNumber;

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1;
            var Year = now.getFullYear() + parseInt(req.body.period, 10);

            const closeDate = new Date(Year, Month, Day);

            const savingAccount = SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber);
            await EMAIL.send(req.currentCustom.email, 'Tai Khoan Tiet Kiem',`${savingAccount.accountType},${savingAccount.moneySending}`);
        }
    }
    else if (req.body.selectpicker_type == 'Limited'){
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

            const savingAccountNumber = req.currentCustom.accountNumber;

            const savingAccount = SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber);
            await EMAIL.send(req.currentCustom.email, 'Tai Khoan Tiet Kiem',`${savingAccount.accountType},${savingAccount.moneySending}`);
        }
        else {
            const accountType = true;
            const interestRate = SAVING_ACCOUNT.yearInterestRate_Limited(req.body.moneySending, parseInt(req.body.period, 10));

            const savingAccountNumber = req.currentCustom.accountNumber;

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1;
            var Year = now.getFullYear() + parseInt(req.body.period, 10);

            const closeDate = new Date(Year, Month, Day);

            const savingAccount = SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber);
            await EMAIL.send(req.currentCustom.email, 'Tai Khoan Tiet Kiem',`${savingAccount.accountType},${savingAccount.moneySending}`);
        }
    }
    else {
        if (req.body.selectpicker_period == 'Month'){
            const accountType = true;
            const interestRate = SAVING_ACCOUNT.InterestRate_Unlimited(req.body.moneySending, parseInt(req.body.period, 10));

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1 + parseInt(req.body.period, 10);
            var Year = now.getFullYear();

            while (Month > 12){
                Month = Month - 12;
                Year = Year + 1;
            }

            const closeDate = new Date(Year, Month, Day);

            const savingAccountNumber = req.currentCustom.accountNumber;

            const savingAccount = SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber);
            await EMAIL.send(req.currentCustom.email, 'Tai Khoan Tiet Kiem',`${savingAccount.accountType},${savingAccount.moneySending}`);

        }
        else {
            const accountType = true;
            const interestRate = SAVING_ACCOUNT.InterUnestRate_Unlimited(req.body.moneySending, parseInt(req.body.period, 10));

            const savingAccountNumber = req.currentCustom.accountNumber;

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1;
            var Year = now.getFullYear() + parseInt(req.body.period, 10);

            const closeDate = new Date(Year, Month, Day);

            const savingAccount = SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber);
            await EMAIL.send(req.currentCustom.email,'Tai Khoan Tiet Kiem',`${savingAccount.accountType},${savingAccount.moneySending}`);
        }
    }
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