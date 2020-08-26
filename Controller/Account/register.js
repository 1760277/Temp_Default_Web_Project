const {Router} = require('express');
const ASYNC_HANDLER = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const CRYPTO = require('crypto');
var BIGUINT = require('biguint-format');
const STAFF = require('../../Model/staff');
const CUSTOMER = require('../../Model/custom');
const EMAIL = require('../../Model/email');
const VERRIFY_ACCOUNT = require('../../Model/verifyAccount');
const PAYMENTACCOUNT = require('../../Model/paymentAccount');  
const { hashPassWord } = require('../../Model/staff');

const ROUTER = new Router();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

ROUTER.get('/', function getRegisterCustomer(req, res){
    const errors=[];
    res.render('Register',{errors:errors})
});
ROUTER.post('/',[
    body('email')
        .isEmail()
        .normalizeEmail()
        .custom(async function (email){
            const found= await CUSTOMER.findByEmail(email);
            if(found){
                throw Error('User exists');
            }
            return true;
        }),
    body('userName')
        .trim()
        .notEmpty(), 
    body('password')
        .isLength ({min:6})
], ASYNC_HANDLER( async function(req, res){
    const errors = validationResult(req) ;
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(422).render('Register',{errors: errors.array()});
    }
    const acNum='5078'+BIGUINT(CRYPTO.randomBytes(2), 'dec');
    const hassPass=await CUSTOMER.hashPassWord(req.body.password);
    const toke=CRYPTO.randomBytes(3).toString('hex').toUpperCase();
    const customer=await CUSTOMER.createCustom(req.body.userName,hassPass,req.body.email,toke,acNum)
    const verify_Account = await VERRIFY_ACCOUNT.createDefault(customer.id, req.body.fullName)

    await EMAIL.send(customer.email, 'Mã kích hoạt tài khoản',`${BASE_URL}/login/${customer.id}/${customer.token}`);
    const custom=await CUSTOMER.findByEmail(req.body.email);
    await PAYMENTACCOUNT.createPaymentAccount(acNum);
    await EMAIL.send(customer.email,'Cảm ơn quý khách đã sử dụng dịch vụ BeautifullBank',`Số tài khoản:  ${customer.accountNumber}`)
    res.redirect('/');
    
}));

ROUTER.get('/staff', function getRegisterStaff(req, res){
    const errors = [];
    res.render('Register_Staff', {errors : errors});
});

ROUTER.post('/staff', [
    body('email')
        .isEmail()
        .normalizeEmail()
        .custom(async function (email){
            const found = await STAFF.findByEmail(email);
            if (found){
                throw Error('User Existed');
            }
            return true;
        }),
    body('fullName')
        .trim()
        .notEmpty(),
    body('password')
        .isLength({ min: 6 }),
], ASYNC_HANDLER (async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).render('Register_Staff', { errors: errors.array() });
    }

    const hashPassword = await STAFF.hashPassWord(req.body.password);
    const accountNumber = BIGUINT(CRYPTO.randomBytes(4), 'dec');

    const staff = await STAFF.createStaff(req.body.email, hashPassword, req.body.userName,req.body.fullName, req.body.officeBank);

    await EMAIL.send(staff.email, 'Tai Khoan Nhan Vien Trong Ngan Hang', `${staff.email}, ${req.body.password}`);

    res.redirect('/login/staff');
}));



ROUTER.get('/auto-create',ASYNC_HANDLER(async function(req,res){
    


}))

module.exports = ROUTER;