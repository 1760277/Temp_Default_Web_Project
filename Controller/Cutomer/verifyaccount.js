const {Router} = require('express');
const ASYNC_HANDLER = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const VERIFYACCOUNT = require('../../Model/verifyAccount');
const EMAIL = require('../../Model/email');


const ROUTER = new Router();

ROUTER.get('/',ASYNC_HANDLER(async function (req, res){
    customid = req.currentCustom.id; 
    const veri = await VERIFYACCOUNT.findByCustomId(customid);
    res.render('VerifyAccount',{veri});
}));

ROUTER.post('/',[
    body('birthDate')
        .notEmpty(),
    body('address')
        .notEmpty(),
    body('frontNationID')
        .notEmpty(),
    body('behindNationID')
        .notEmpty(),
    body('numberNationID')
        .notEmpty()
        .isInt(),
    body('dateRange')
        .notEmpty(),
    body('addressRange')
        .notEmpty(),       
],ASYNC_HANDLER( async function(req, res){
    const errors = validationResult(req) ;
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(422).render('VerifyAccount',{errors: errors.array()});
    }

customid= req.currentCustom.id;
const verify = await VERIFYACCOUNT.updateAccount(customid,req.body.birthDate, req.body.address,req.body.frontNationID, req.body.behindNationID,req.body.numberNationID, req.body.dateRange, req.body.addressRange)

res.redirect('/');

}));












module.exports = ROUTER;