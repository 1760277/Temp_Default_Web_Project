<<<<<<< HEAD
const {Router} = require('express');
const ROUTER = new Router();
const VERRIFY_ACCOUNT = require('../Model/verifyAccount');
const ASYNC_HANDLER = require('express-async-handler');

ROUTER.get('/', function getHomePage(req, res){
    
    res.render('Index')
});

ROUTER.get('/accuracy', ASYNC_HANDLER(async function getAccuracyInfo(req, res){
        const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findInfoByUserId(req.session.cusTomId);
        res.render('Accuracy_Info', {verifyAccount : CUSTOM_VERRIFY_ACCOUNT});
    })
),
                                                        
                 
ROUTER.post('/accuracy', ASYNC_HANDLER(async function postVerifyAccount(req, res){    
    const verify = await VERRIFY_ACCOUNT.updateAccount(req.session.cusTomId, req.body.fullName,req.body.birthDate, req.body.address,req.body.frontNationID, req.body.behindNationID  ,req.body.numberNationID, req.body.dateRange, req.body.addressRange);
    const update = await VERRIFY_ACCOUNT.updateRequest_True(req.session.cusTomId);
    res.redirect('/accuracy');
}));
=======
const {Router} = require('express');
const ROUTER = new Router();
const VERRIFY_ACCOUNT = require('../Model/verifyAccount');
const ASYNC_HANDLER = require('express-async-handler');

ROUTER.get('/', function getHomePage(req, res){
    
    res.render('Index')
});

ROUTER.get('/accuracy', ASYNC_HANDLER(async function getAccuracyInfo(req, res){
        const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findInfoByUserId(req.session.cusTomId);
        res.render('Accuracy_Info', {verifyAccount : CUSTOM_VERRIFY_ACCOUNT});
    })
),
                                                        
                 
ROUTER.post('/accuracy', ASYNC_HANDLER(async function postVerifyAccount(req, res){    
    const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.updateAccount(req.session.cusTomId , req.body.fullName, req.body.birthDate,req.body.address,null,null,req.body.dateRange,req.body.addressRange);
    res.redirect('/accuracy');
}));
>>>>>>> fdc50d76c4fa705dbbc7fcdcd14b4b98db0cca02
module.exports = ROUTER;