const {Router} = require('express');
const ROUTER = new Router();
const ASYNC_HANDLER = require('express-async-handler');
const STAFF = require('../../Model/staff');

ROUTER.get('/', ASYNC_HANDLER(async function getStaffProfile(req, res){
    const STAFF_INFO = await STAFF.findById( req.session.staffId );

    res.render('Profile_Staff',{staff : STAFF_INFO});
})),

module.exports = ROUTER;