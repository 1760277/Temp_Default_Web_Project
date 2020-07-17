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
module.exports = ROUTER;