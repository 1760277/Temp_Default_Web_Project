const { Router } = require('express');
const ASYNC_HANDLER = require('express-async-handler');
const PAYMENTACCOUNT = require('../../Model/paymentAccount');
const REQUIRED_LOGIN_CUSTOM = require('../../Middleware/requireLoggedIn')
const ROUTER = new Router();

ROUTER.use(REQUIRED_LOGIN_CUSTOM);
ROUTER.get('/', ASYNC_HANDLER(async function (req, res) {
    const accountNumber = req.currentCustom.accountNumber;
    const account = await PAYMENTACCOUNT.findbyAccountNumber(accountNumber);
    res.render('InforAccount', { account: account })

}))

module.exports = ROUTER;