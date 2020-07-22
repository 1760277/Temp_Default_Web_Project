const {Router} = require('express');
const CUSTOM = require('../../Model/custom');
const STAFF = require('../../Model/staff');
const ASYNC_HANDLER = require('express-async-handler');

const ROUTER = new Router();

ROUTER.get('/', function getLoginCustomer(req, res){
    res.render('Login_Custom');
});

ROUTER.post('/',ASYNC_HANDLER(async function(req,res){
    const cusTom=await CUSTOM.findByUsername(req.body.userName);
    console.log(cusTom);
    if(!cusTom || !CUSTOM.verifyPassWord(req.body.password,cusTom.passWord)){
        return res.render('Login_Custom');
    }
    req.session.cusTomId = cusTom.id;
    
    res.redirect('/');
}))

ROUTER.get('/:id/:token',  ASYNC_HANDLER(async function(req,res){
    const {id,token}=req.params;
    const cusTom = await CUSTOM.findById(id);
    if(cusTom && cusTom.token===token){
        cusTom.token=null;
        cusTom.save();
        req.session.cusTomId= cusTom.id;
    }
    res.redirect('/');
}));

ROUTER.get('/staff', function getLoginStaff(req, res){
    res.render('Login_Staff')
});

ROUTER.post('/staff', ASYNC_HANDLER (async function (req, res){
    const staff = await STAFF.findByEmail(req.body.email);
    if (!staff || !STAFF.verifyPassWord(req.body.password, staff.password)) {
        return res.render('Login_Staff');
    }
    req.session.staffId = staff.id;
    res.redirect('/admin');
}));

ROUTER.get('/staff/:id',  ASYNC_HANDLER(async function (req,res){
    const {id}=req.params;
    const staff = await STAFF.findById(id);
    if(staff){
        req.session.staffId= staff.id;
    }
    res.redirect('/');
}));



ROUTER.get('/auto-create',ASYNC_HANDLER(async function(req,res){
    for (var index = 0; index < 100; index++) {
        const hashPassword = await STAFF.hashPassWord('1');
        const staff = await STAFF.createStaff("staff_"+index, hashPassword, "BB staff " + index, "0");    
    
        const customer=await CUSTOMER.createCustom("BB"+(10000+index),"Custom_"+index +"@gamil.com",hashPassword,"BB Custom" + index,"")
    }
}))
module.exports = ROUTER;