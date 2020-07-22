const {Router} = require('express');
const ROUTER = new Router();
const ASYNC_HANDLER = require('express-async-handler');
const STAFF = require('../../Model/staff');

ROUTER.get('/profile', ASYNC_HANDLER(async function getStaffProfile(req, res){
    const STAFF_INFO = await STAFF.findById( req.session.staffId );

    res.render('Profile_Staff',{staff : STAFF_INFO});
})),

ROUTER.post('/profile', ASYNC_HANDLER(async function postStaffProfile(req, res){
    const STAFF_INFO = await STAFF.updateStaff( req.session.staffId , req.body.fullName, req.body. email, null);

    res.redirect('/staff/profile'); 
})),
module.exports = ROUTER;