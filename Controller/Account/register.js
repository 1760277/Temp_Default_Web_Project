const {Router} = require('express');
const ASYNC_HANDLER = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const CRYPTO = require('crypto');
var BIGUINT = require('biguint-format');
const STAFF = require('../../Model/staff');
const CUSTOMER = require('../../Model/custom');
const EMAIL = require('../../Model/email');

const ROUTER = new Router();

ROUTER.get('/', function getRegisterCustomer(req, res){
    res.render('Register')
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
    body('fullName')
        .trim()
        .notEmpty(), 
    body('password')
        .isLength ({min:6}),
], ASYNC_HANDLER( async function(req, res){
    const errors = validationResult(req) ;
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(422).render('Register',{errors: errors.array()});
    }
    const acNum='10000'+BIGUINT(CRYPTO.randomBytes(2), 'dec');
    const hassPass=await CUSTOMER.hashPassWord(req.body.password);
    const toke=CRYPTO.randomBytes(3).toString('hex').toUpperCase();
    const customer=await CUSTOMER.createCustom(acNum,req.body.userName,req.body.email,hassPass,req.body.fullName,toke)
    //console.log(customer)
    await EMAIL.send(customer.email, 'Mã kích hoạt tài khoản',`http://localhost:3000/login/${customer.id}/${customer.token}`);
    const custom=await CUSTOMER.findByEmail(req.body.email);
    
    res.redirect('/');
}));

ROUTER.get('/staff', function getRegisterStaff(req, res){
    res.render('Register_Staff');
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

    const staff = await STAFF.createStaff(req.body.email, hashPassword, req.body.fullName, req.body.officeBank);

    await EMAIL.send(staff.email, 'Tai Khoan Nhan Vien Trong Ngan Hang', `${staff.email}, ${req.body.password}`);

    res.redirect('/register/staff');
}));



ROUTER.get('/auto-create',ASYNC_HANDLER(async function(req,res){
    for (var index = 0; index < 100; index++) {
        const hashPassword = await STAFF.hashPassWord('1');
        const staff = await STAFF.createStaff("staff_"+index+"@gmail.com", hashPassword, "BB staff " + index, "0");    
    
        const customer=await CUSTOMER.createCustom("BB"+(10000+index),"Custom_"+index +"@gamil.com",hashPassword,"BB Custom" + index,"")
    }


}))

module.exports = ROUTER;