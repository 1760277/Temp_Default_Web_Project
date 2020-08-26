const {Router} = require('express');
const CRYPTO = require('crypto');
var BIGUINT = require('biguint-format');
const ASYNC_HANDLER = require('express-async-handler');
const CUSTOMER = require('./custom');

const ROUTER = new Router();

ROUTER.get('/', function gerdCustomer(req, res){
    res.render('Randomcustom')
});

ROUTER.post('/',ASYNC_HANDLER(async function(req, res){
    const sl=req.body.soluong;
    for(var i=0;i<sl;i++){
        const acNum='10000'+BIGUINT(CRYPTO.randomBytes(2), 'dec');
        const name=BIGUINT(CRYPTO.randomBytes(1), 'hex',{prefix:'user'});
        const email=BIGUINT(CRYPTO.randomBytes(1), 'hex',{prefix:'test'})+'@gmail.com';
        const hassPass=await CUSTOMER.hashPassWord('123456');
        const fullname=BIGUINT(CRYPTO.randomBytes(1), 'hex',{prefix:'Nguyen van '});
        const customer=await CUSTOMER.createCustom(acNum,name,email,hassPass,fullname,null);
    }
    res.redirect('/random');
}));

module.exports = ROUTER;