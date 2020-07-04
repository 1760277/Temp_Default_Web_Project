const {Router} = require('express');
const ROUTER = new Router();
const ASYNC_HANDLER = require('express-async-handler');
const CUSTOMER = require('../Model/custom');

ROUTER.get('/', ASYNC_HANDLER(async function getCustomProfile(req, res){
    const CUSTOM_INFO = await CUSTOMER.findById( req.session.staffId );

    res.render('Profile_Custom',{custom : CUSTOM_INFO});
})),

module.exports = ROUTER;