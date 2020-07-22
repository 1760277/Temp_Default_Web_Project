const {Router} = require('express');
const ASYNC_HANDLER = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const CRYPTO = require('crypto');
const VERIFYACCOUNT = require('../../Model/verifyAccount');
const EMAIL = require('../../Model/email');
const PAYMENTACCOUNT = require('../../Model/paymentAccount');
const PAYMENT = require('../../Model/payment');
const CUSTOMER = require('../../Model/custom');
const DETAILSPAYMENT = require('../../Model/detailsPayment');
const MOMENT = require('moment');
const DetailsPayment = require('../../Model/detailsPayment');
const REQUIRELOGIN = require('../../Middleware/requireLoggedIn')
const { render } = require('ejs');

const ROUTER = new Router();

ROUTER.use(REQUIRELOGIN);
ROUTER.get('/', ASYNC_HANDLER( async function (req, res){
    accountNumber = req.currentCustom.accountNumber;
    const paymentAC = await PAYMENTACCOUNT.findbyAccountNumber(accountNumber);
    res.render('Payment',{paymentAC:paymentAC});
}));

ROUTER.post('/',[
    body('accountNumberReceive')
        .notEmpty()
        .isInt()
        .custom(async function (accountNumberReceive){
            const found= await PAYMENTACCOUNT.findbyAccountNumber(accountNumberReceive);
            if(!found){
                throw Error('AccountNumber not exists');
            }
            return true;
        }),
    body('moneyDeposit')
        .notEmpty()
        .isInt(),
], ASYNC_HANDLER(async function(req,res){
    const errors = validationResult(req) ;
    accountNumber = req.currentCustom.accountNumber;
    // lấy thông tin custom
    const customsend = await CUSTOMER.findByAccountNumber(accountNumber);
    //lấy thông tin người nhận
    const customreceive = await CUSTOMER.findByAccountNumber(req.body.accountNumberReceive);
    const customrc = await VERIFYACCOUNT.findByCustomId(customreceive.id);
    console.log(customrc);
    // lấy thông tin tài khoản 
    const payAC = await PAYMENTACCOUNT.findbyAccountNumber(accountNumber);
    
    const OTP=CRYPTO.randomBytes(3).toString('hex').toUpperCase();
    //tinh tien
    var found = payAC.availableBalance - req.body.moneyDeposit;
    console.log(found);
    // kiểm tra thông tin người nhận
    if(customreceive && found > 0){
        const PM = await PAYMENT.createPaymentInBank(accountNumber,req.body.accountNumberReceive,customrc.fullName,req.body.moneyDeposit,OTP)
        await EMAIL.send(customsend.email,'Xác thực giao dịch ',`http://localhost:3000/payment/${PM.id}/${PM.OTP}`);
        const code = CRYPTO.randomBytes(4).toString('hex');
        const payment = await PAYMENT.findByNumberAccount(accountNumber,req.body.accountNumberReceive,req.body.moneyDeposit);
        await DETAILSPAYMENT.createDetalsPayment(code,req.body.availableBalance,req.body.moneyDeposit,req.body.contentPayment,payment.id)
        const moneysend = payAC.availableBalance - payment.moneyDeposit;
        await PAYMENTACCOUNT.updateBalace(moneysend,accountNumber);
        res.redirect('/paymentinbank');
    }
    else{
        res.redirect('Payment');
    }
    
    
}))

ROUTER.get('/:id/:OTP', ASYNC_HANDLER(async function(req,res){
    const {id, OTP} = req.params;
    const payment = await PAYMENT.findById(id);
    if(payment && payment.OTP===OTP){
        payment.OTP=null;
        payment.save();
    }
    res.redirect('/');
}))

ROUTER.get('/history',ASYNC_HANDLER(async function(req,res){
    const accountNumber = req.currentCustom.accountNumber
    const payment = await  PAYMENT.findpaymentByAccount(accountNumber)
    const detailpayment =  await DETAILSPAYMENT.finallDetailsPayment();
    res.render('History_Payment_Custom',{pm:payment,moment : MOMENT,del:detailpayment,ac:accountNumber})
}))


module.exports = ROUTER;