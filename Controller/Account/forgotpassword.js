const {Router} = require('express');
const CUSTOM = require('../../Model/custom');
const ASYNC_HANDLER = require('express-async-handler');
const EMAIL = require('../../Model/email');
const { render } = require('ejs');

const ROUTER = new Router();

ROUTER.get('/', function getforgotpassword(req,res){
    res.render('Forgot_Password');
});

ROUTER.post('/',ASYNC_HANDLER(async function(req,res){
    var password = '1'
    const hashpassword = await CUSTOM.hashPassWord(password);
    const email = req.body.email;
    console.log(email);
    await CUSTOM.updatepassword(email,hashpassword);
    await EMAIL.send(email,'Mật khẩu mới',`'Mật khẩu mới của quý khách là: ${password}`);
    res.redirect('/');

}))
module.exports = ROUTER;