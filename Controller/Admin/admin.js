const {Router} = require('express');
const ASYNC_HANDLER = require('express-async-handler');
const STAFF = require('../../Model/staff');
const CUSTOMER = require('../../Model/custom');
const PAYMENT = require('../../Model/payment');
const PAYMENTACCOUNT =  require('../../Model/paymentAccount');
const DETAILSPAYMENT =  require('../../Model/detailsPayment');
const VERRIFY_ACCOUNT = require('../../Model/verifyAccount');
const EMAIL = require('../../Model/email');

const MOMENT = require('moment');
const ROUTER = new Router();


ROUTER.get('/', function getAdminDashboard(req, res){
    res.render('admin')
});

ROUTER.get('/history-create-custom', ASYNC_HANDLER ( async function getAdminDashboard(req, res){    
    const CUS_LIST = await CUSTOMER.getAllCustom();
    const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findAllVerifyAccount();
    console.log(CUSTOM_VERRIFY_ACCOUNT);
    res.render('History_Create_Custom', {lst: CUS_LIST, moment : MOMENT,  verifyAccount: CUSTOM_VERRIFY_ACCOUNT})
}));

ROUTER.get('/history-create-staff',ASYNC_HANDLER ( async function getAdminDashboard(req, res){
    const STAFF_LIST = await STAFF.getAllStaff()
    console.log(STAFF_LIST)
    res.render('History_Create_Staff', {lst:STAFF_LIST, moment : MOMENT })
}));

ROUTER.get('/customer_request_list', ASYNC_HANDLER ( async function getAdminDashboard(req, res){    
  
    const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findAllRequestNotCheck();

    for (let index = 0; index < CUSTOM_VERRIFY_ACCOUNT.length; index++) {
        console.log(CUSTOM_VERRIFY_ACCOUNT[index].fullName);
        
    }
    res.render('Customer_Request_List', { moment : MOMENT,  verifyAccount: CUSTOM_VERRIFY_ACCOUNT})
}));

ROUTER.get('/paymenthistory',ASYNC_HANDLER(async function(req,res){
    const details_list = await DETAILSPAYMENT.finallDetailsPayment();
    const staff = await STAFF.findById(req.currentStaff.id);
    const payment_list = await PAYMENT.findAllPayment();
    console.log(details_list);
    res.render('History_Payment',{pm:payment_list, del: details_list,staff:staff,moment : MOMENT})
}))

ROUTER.get('/paymenthistory/:paymentId/:staffId/veripayment',ASYNC_HANDLER(async function(req,res){
    const {paymentId,staffId} = req.params;
    const payment = await PAYMENT.findById(paymentId);
    console.log(payment);
    if(payment){
        const paymentsend = await PAYMENTACCOUNT.findbyAccountNumber(payment.accountNumberSend);
        const paymentrecive = await PAYMENTACCOUNT.findbyAccountNumber(payment.accountNumberReceive);
        const moneysend = paymentsend.availableBalance - payment.moneyDeposit;
        const moneyrecive = Number(paymentrecive.availableBalance) + Number(payment.moneyDeposit);
        const updaterecive = await PAYMENTACCOUNT.updateBalace(moneyrecive,paymentrecive.accountNumber);
        const updatedetails = await DETAILSPAYMENT.updatedetailsPyament(paymentId,staffId);
        const customsend = await CUSTOMER.findByAccountNumber(paymentsend.accountNumber);
        const customreceive = await CUSTOMER.findByAccountNumber(paymentrecive.accountNumber);
        await EMAIL.send(customsend.email,'Thông báo giao dịch',`Quý khách vừa chuyển tiền thành công đến: \n số tài khoản: ${paymentrecive.accountNumber} \n số tiền là: ${payment.moneyDeposit}.\n Cảm ơn quý khách đã sử dụng dịch vụ`)
        await EMAIL.send(customreceive.email,'Thông báo giao dịch',`Quý khách vừa nhận được tiền từ: \n số tài khoản: ${paymentsend.accountNumber} \n số tiền là: ${payment.moneyDeposit}.\n Cảm ơn quý khách đã sử dụng dịch vụ`)
    }
    res.redirect('/admin/paymenthistory');
}));


module.exports = ROUTER;