// const {Router} = require('express');
// const ROUTER = new Router();
// const VERRIFY_ACCOUNT = require('../../Model/verifyAccount');

// const ASYNC_HANDLER = require('express-async-handler');


// ROUTER.get('/accuracy', ASYNC_HANDLER(async function getAccuracyInfo(req, res){    
//         const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findInfoByUserId(req.session.cusTomid);
//         res.render('Accuracy_Info', {verifyAccount : CUSTOM_VERRIFY_ACCOUNT});
//     })
// ),
                                                        
                 
// ROUTER.post('/accuracy', ASYNC_HANDLER(async function postVerifyAccount(req, res){
   
//     const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findInfoByUserId(req.session.cusTomid);
//     const verify = await VERRIFY_ACCOUNT.updateAccount(req.session.cusTomid, req.body.fullName, req.body.birthDate, req.body.address, req.body.numberNationID, req.body.dateRange, req.body.addressRange);   
   
//     const update = await VERRIFY_ACCOUNT.updateRequest_True(req.session.cusTomid);
//     res.redirect('/accuracy');
// }));
// module.exports = ROUTER;