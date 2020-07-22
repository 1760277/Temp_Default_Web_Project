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
const SavingAccount = require('../Model/savingAccount');
const REQUIRED_LOGIN_CUSTOM = require('../Middleware/requireLoggedIn');
const REQUIRED_LOGIN_STAFF = require('../Middleware/requireLoggedInStaff');


const ROUTER = new Router();

ROUTER.use(REQUIRED_LOGIN_CUSTOM);
ROUTER.get('/', function getRegisterCustomer(req, res){
    res.render('Saving_Account');
});

ROUTER.get('/mySavingAccount', ASYNC_HANDLER(async function(req, res){
    const savingAccount = await SAVING_ACCOUNT.findAllSavingAccountByCustomNumber(req.currentCustom.accountNumber);

    res.render('My_Saving_Account', {savingAccount : savingAccount});
}));

ROUTER.get('/:id/close', ASYNC_HANDLER(async function (req, res) {
    const { id } = req.params;
    const savingAccount = await SAVING_ACCOUNT.findById(id);

    if (savingAccount.accountType === true){
        savingAccount.interestRate = await SAVING_ACCOUNT.InterestRate_Unlimited();
        console.log(savingAccount.interestRate);
        const now = new Date();
        

        if (now.getFullYear() < savingAccount.closeDate.getFullYear()){
            const Day = now.getDate();// - savingAccount.openDate.getDate();
            const Month = (now.getMonth() + 1);// - (savingAccount.openDate.getMonth() + 1);
            const Year = now.getFullYear();// - savingAccount.openDate.getFullYear();

            var count = 0;

            while (Month != (savingAccount.openDate.getMonth() + 1) || Year != savingAccount.openDate.getFullYear()){
                if (Month == 1){
                    Month == 12;
                    Year = Year - 1;
                    count = count + 1;
                }
                else {
                    Month = Month - 1;
                    count = count + 1;
                }
            }

            savingAccount.moneyReceive = savingAccount.moneySending * savingAccount.interestRate / 12 * count;
            savingAccount.status = false;
            savingAccount.save();
        }
        else {
            if ((now.getMonth() + 1) < (savingAccount.closeDate.getMonth() + 1)){
                var count = 0;
                while (Month != (savingAccount.openDate.getMonth() + 1)){
                    Month = Month - 1;
                    count = count + 1;
                }
    
                savingAccount.moneyReceive = savingAccount.moneySending * savingAccount.interestRate / 12 * count;
                savingAccount.status = false;
                savingAccount.save();
            }
            else {
                if (now.getDate() < savingAccount.closeDate.getDate()){
                    savingAccount.moneyReceive = savingAccount.moneySending * savingAccount.interestRate / 12 * savingAccount.period;

                    savingAccount.status = false;
                    savingAccount.save();
                }
            }
        }
    }

    savingAccount.status = false;
    savingAccount.save();
    res.redirect('/savingAccount/mySavingAccount');
}));

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
            const interestRate = await SAVING_ACCOUNT.quarterlyInterestRate_Limited(req.body.moneySending, parseInt(req.body.period, 10));

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1 + parseInt(req.body.period, 10);
            var Year = now.getFullYear();

            while (Month > 12){
                Month = Month - 12;
                Year = Year + 1;
            }
            
            const moneyReceive = req.body.moneySending * interestRate / 12 * req.body.period;

            const closeDate = new Date(Year, Month, Day);

            const savingAccountNumber = req.currentCustom.accountNumber;

            const savingAccount = await SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber, moneyReceive);
            await EMAIL.send(req.currentCustom.email, 'Tai Khoan Tiet Kiem',`${savingAccount.moneyReceive},${savingAccount.moneySending}`);
        }
        else {
            const accountType = true;
            const interestRate = await SAVING_ACCOUNT.yearInterestRate_Limited(req.body.moneySending, parseInt(req.body.period, 10));

            const savingAccountNumber = req.currentCustom.accountNumber;

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1;
            var Year = now.getFullYear() + parseInt(req.body.period, 10);

            const moneyReceive = req.body.moneySending * interestRate / 12 * (req.body.period * 12);

            const closeDate = new Date(Year, Month, Day);

            const savingAccount = await SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber, moneyReceive);
            await EMAIL.send(req.currentCustom.email, 'Tai Khoan Tiet Kiem',`${savingAccount.moneyReceive},${savingAccount.moneySending}`);
        }
    }
    else if (req.body.selectpicker_type == 'Limited'){
        if (req.body.selectpicker_period == 'Month'){
            const accountType = true;
            const interestRate = await SAVING_ACCOUNT.quarterlyInterestRate_Limited(req.body.moneySending, parseInt(req.body.period, 10));

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1 + parseInt(req.body.period, 10);
            var Year = now.getFullYear();

            while (Month > 12){
                Month = Month - 12;
                Year = Year + 1;
            }

            const moneyReceive = req.body.moneySending * interestRate / 12 * req.body.period;

            const closeDate = new Date(Year, Month, Day);

            const savingAccountNumber = req.currentCustom.accountNumber;

            const savingAccount = await SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber, moneyReceive);
            await EMAIL.send(req.currentCustom.email, 'Tai Khoan Tiet Kiem',`${savingAccount.moneyReceive},${savingAccount.moneySending}`);
        }
        else {
            const accountType = true;
            const interestRate = await SAVING_ACCOUNT.yearInterestRate_Limited(req.body.moneySending, parseInt(req.body.period, 10));

            const savingAccountNumber = req.currentCustom.accountNumber;

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1;
            var Year = now.getFullYear() + parseInt(req.body.period, 10);

            const moneyReceive = req.body.moneySending * interestRate / 12 * (req.body.period * 12);

            const closeDate = new Date(Year, Month, Day);

            const savingAccount = await SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber, moneyReceive);
            await EMAIL.send(req.currentCustom.email, 'Tai Khoan Tiet Kiem',`${savingAccount.moneyReceive},${savingAccount.moneySending}`);
        }
    }
    else {
        if (req.body.selectpicker_period == 'Month'){
            const accountType = true;
            const interestRate = await SAVING_ACCOUNT.InterestRate_Unlimited();

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1 + parseInt(req.body.period, 10);
            var Year = now.getFullYear();

            while (Month > 12){
                Month = Month - 12;
                Year = Year + 1;
            }
            const moneyReceive = req.body.moneySending * interestRate / 12 * req.body.period;
            const closeDate = new Date(Year, Month, Day);

            const savingAccountNumber = req.currentCustom.accountNumber;

            const savingAccount = await SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber, moneyReceive);
            await EMAIL.send(req.currentCustom.email, 'Tai Khoan Tiet Kiem',`${savingAccount.moneyReceive},${savingAccount.moneySending}`);

        }
        else {
            const accountType = true;
            const interestRate = await SAVING_ACCOUNT.InterUnestRate_Unlimited();

            const savingAccountNumber = req.currentCustom.accountNumber;

            const now = new Date();
            var Day = now.getDate();
            var Month = now.getMonth() + 1;
            var Year = now.getFullYear() + parseInt(req.body.period, 10);
            const moneyReceive = req.body.moneySending * interestRate / 12 * (req.body.period * 12);
            const closeDate = new Date(Year, Month, Day);

            const savingAccount = await SAVING_ACCOUNT.CreateSavingAccount(req.body.moneySending, interestRate, closeDate, accountType, savingAccountNumber, moneyReceive);
            await EMAIL.send(req.currentCustom.email,'Tai Khoan Tiet Kiem',`${savingAccount.moneyReceive},${savingAccount.moneySending}`);
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