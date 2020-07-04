const STAFF = require('../Model/staff');
const ASYNC_HANDLER = require('express-async-handler');

module.exports = ASYNC_HANDLER (async function auth(req, res, next) {
    const staffId = req.session.staffId;
    res.locals.currentStaff = null;
    if (!staffId){
        return next();
    }
    const staff = await STAFF.findById(staffId);
    if (!staff) {
        return next();
    }
    req.currentStaff = staff;
    res.locals.currentStaff = staff;
    next();
});