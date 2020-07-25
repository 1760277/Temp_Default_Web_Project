const {Router} = require('express');
const ASYNC_HANDLER = require('express-async-handler');
const PAYMENTACCOUNT = require('../../Model/paymentAccount');
<<<<<<< HEAD
const REQUIRED_LOGIN_CUSTOM = require('../../Middleware/requireLoggedIn')
const ROUTER = new Router();

ROUTER.use(REQUIRED_LOGIN_CUSTOM);
=======
const REQUIRELOGIN = require('../../Middleware/requireLoggedIn')
const ROUTER = new Router();

ROUTER.use(REQUIRELOGIN);


>>>>>>> fdc50d76c4fa705dbbc7fcdcd14b4b98db0cca02
ROUTER.get('/',ASYNC_HANDLER(async function(req,res){
    const accountNumber = req.currentCustom.accountNumber;
    const account = await PAYMENTACCOUNT.findbyAccountNumber(accountNumber);
    res.render('InforAccount',{account:account})

}))





module.exports = ROUTER;