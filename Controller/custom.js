<<<<<<< HEAD
const {Router} = require('express');
const ROUTER = new Router();
const ASYNC_HANDLER = require('express-async-handler');
const CUSTOMER = require('../Model/custom');
const VERRIFY_ACCOUNT = require('../Model/verifyAccount');
//const { findByUsername } = require('../Model/custom');
const MOMENT = require('moment');


ROUTER.get('/profile', ASYNC_HANDLER(async function getCustomProfile(req, res){
    const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findInfoByUserId(req.currentCustom.id);
    console.log(CUSTOM_VERRIFY_ACCOUNT.fullName)
    res.render('Profile_Custom',{custom : req.currentCustom, verifyAccount: CUSTOM_VERRIFY_ACCOUNT });      
}));

ROUTER.post('/profile', ASYNC_HANDLER(async function postCustomProfile(req, res){    
    const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.updateAccount(req.session.cusTomId , req.body.fullName, req.body.birthDate,null,null,null,null,null);
    const CUSTOM_INFO = await CUSTOMER.findById( req.session.cusTomId  );    
    res.redirect('/custom/profile');      
}));
=======
const {Router} = require('express');
const ROUTER = new Router();
const ASYNC_HANDLER = require('express-async-handler');
const CUSTOMER = require('../Model/custom');
const VERRIFY_ACCOUNT = require('../Model/verifyAccount');
//const { findByUsername } = require('../Model/custom');
const MOMENT = require('moment');


ROUTER.get('/profile', ASYNC_HANDLER(async function getCustomProfile(req, res){
    const CUSTOM_INFO = await CUSTOMER.findById( req.session.cusTomId  );
    const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findInfoByUserId(req.session.cusTomId );
    
    res.render('Profile_Custom',{custom : CUSTOM_INFO, verifyAccount: CUSTOM_VERRIFY_ACCOUNT });      
}));

ROUTER.post('/profile', ASYNC_HANDLER(async function postCustomProfile(req, res){    
    const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.updateAccount(req.session.cusTomId , req.body.fullName, req.body.birthDate,null,null,null,null,null);
    const CUSTOM_INFO = await CUSTOMER.findById( req.session.cusTomId  );    
    res.redirect('/custom/profile');      
}));
>>>>>>> fdc50d76c4fa705dbbc7fcdcd14b4b98db0cca02
module.exports = ROUTER;