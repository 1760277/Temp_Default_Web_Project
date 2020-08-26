const { Router } = require('express');
const ROUTER = new Router();
const ASYNC_HANDLER = require('express-async-handler');
const STAFF = require('../../Model/staff');
const IMAGE = require('../../Model/image');
const UPLOAD = require('../../Middleware/upload');
const staffId = require('../../Middleware/staff_auth');


// < -------------------------- PROFILE  STAFF---------------------------->
ROUTER.get('/profile', ASYNC_HANDLER(async function getStaffProfile(req, res) {
    const STAFF_INFO = await STAFF.findById(req.session.staffId);
    const IMAGE_ID = await IMAGE.findByIdbystaff(req.session.staffId);

    res.render('Profile_Staff', { staff: STAFF_INFO, img: IMAGE_ID[IMAGE_ID.length - 1] });
}));

ROUTER.post('/profile', UPLOAD.single('avatar'), ASYNC_HANDLER(async function postStaffProfile(req, res) {
    const STAFF_INFO = await STAFF.findById(req.session.staffId);
    await STAFF.updateStaff(req.session.staffId, req.body.fullName, req.body.email, null);

    res.redirect('/staff/profile');
}));

// <--------------------------------------------------- CHANGE PASSWORD -------------------------->
ROUTER.get('/profile/password', ASYNC_HANDLER(async function getStaffPassword(req, res) {
    res.render('Staff_ChangePassword');
}));

ROUTER.post('/profile/password', ASYNC_HANDLER(async function postStaffPassword(req, res) {
    const STAFF_PW = await STAFF.changePassword(req.session.staffId, req.body.oldpassword, req.body.newpassword);
    res.redirect('/staff/profile/password');
}));

// <----------------------------------- AVARTAR STAFF ---------------------------------------->
ROUTER.get('/profile/avartar', ASYNC_HANDLER(async function getStaffProfile(req, res) {
    const IMAGE_ID = await IMAGE.findByIdbystaff(req.session.staffId);
    res.render('Avartar_Staff', { img: IMAGE_ID[IMAGE_ID.length - 1] });
}));

ROUTER.post('/profile/avartar', UPLOAD.single('avatar'), ASYNC_HANDLER(async function postStaffAvartar(req, res) {
    IMAGE.uploadFileImagebyStaff(req.session.staffId, req.file.filename, req.file.path);
    res.redirect('/staff/profile/avartar');
}));
module.exports = ROUTER;