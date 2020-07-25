const CUSTOM = require('../Model/custom');
const ASYNC_HANDLER = require('express-async-handler');

module.exports=ASYNC_HANDLER( async function auth(req,res,next){
    const cusTomId = req.session.cusTomId ;
    const accoutNumber = req.session.accoutNumber;
    res.locals.currentCustom=null;
    if(!cusTomId){
        return next();
    }
    const cusTom = await CUSTOM.findById(cusTomId)
    if(!cusTom){
        return next();
    }
    req.currentCustom=cusTom;
    res.locals.currentCustom=cusTom;
    next();
});