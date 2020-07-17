const {Router} = require('express');
const ASYNC_HANDLER = require('express-async-handler');
const STAFF = require('../../Model/staff');
const CUSTOMER = require('../../Model/custom');
const VERRIFY_ACCOUNT = require('../../Model/verifyAccount');
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
    const CUS_LIST = await CUSTOMER.getAllCustom();
    const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findAllVerifyAccount();
    console.log(CUSTOM_VERRIFY_ACCOUNT);
    res.render('Customer_Request_List', {lst: CUS_LIST, moment : MOMENT,  verifyAccount: CUSTOM_VERRIFY_ACCOUNT})
}));

module.exports = ROUTER;