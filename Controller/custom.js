const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const UPLOAD = require('../Middleware/upload');
const ASYNC_HANDLER = require('express-async-handler');
const CUSTOMER = require('../Model/custom');
const VERRIFY_ACCOUNT = require('../Model/verifyAccount');
const IMAGE = require('../Model/image');
const IMAGEID = require('../Model/ImageID');

const ROUTER = new Router();

// <------------------------------------ PROFILE CUSTOM----------------------------------->
ROUTER.get('/profile', ASYNC_HANDLER(async function getCustomProfile(req, res) {
    const CUSTOM_INFO = await CUSTOMER.findById(req.session.cusTomId);
    const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findInfoByUserId(req.session.cusTomId);
    const IMAGE_ID = await IMAGE.findById(req.session.cusTomId);
    res.render('Profile_Custom', { custom: CUSTOM_INFO, verifyAccount: CUSTOM_VERRIFY_ACCOUNT, img: IMAGE_ID[IMAGE_ID.length - 1] });
}));

ROUTER.post('/profile', ASYNC_HANDLER(async function postCustomAvartar(req, res) {
    const CUSTOM_INFO = await CUSTOMER.findById(req.session.cusTomId);
    await VERRIFY_ACCOUNT.updateProfile(req.session.cusTomId, req.body.fullName);
    res.redirect('/custom/profile');
}));

// < -----------------------------CHANGE PASSWORD------------------------------------->
ROUTER.get('/profile/password', ASYNC_HANDLER(async function getCustomPassWord(req, res) {
    res.render('Custom_ChangePassword');
}));

ROUTER.post('/profile/password', ASYNC_HANDLER(async function postCustomPassWord(req, res) {
    const CUSTOM_PW = await CUSTOMER.changePassword(req.session.cusTomId, req.body.oldpassword, req.body.newpassword)
    res.redirect('/custom/profile');
}));

//<-------------------------------------------ACCURACY_INFOR----------------------------------->
ROUTER.get('/profile/accuracy', ASYNC_HANDLER(async function getAccuracyInfo(req, res) {
    const IMAGE_ID1=await IMAGEID.findAllImage();
    const IMAGE_ID2=await IMAGEID.findAllImage();
    const CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findInfoByUserId(req.session.cusTomId);
    res.render('Accuracy_Info', { verifyAccount: CUSTOM_VERRIFY_ACCOUNT,img1: IMAGE_ID1[IMAGE_ID1.length - 2], img2: IMAGE_ID2[IMAGE_ID2.length -1]  });
}));

ROUTER.post('/profile/accuracy', ASYNC_HANDLER(async function postVerifyAccount(req, res) {
    const ID_CUSTOM_VERRIFY_ACCOUNT = await VERRIFY_ACCOUNT.findInfoByUserId(req.session.cusTomId);
    await VERRIFY_ACCOUNT.updateAccount(req.session.cusTomId, req.body.fullName, req.body.birthDate, req.body.address, req.body.numberNationID, req.body.dateRange, req.body.addressRange);
    await VERRIFY_ACCOUNT.updateRequest_True(req.session.cusTomId);
    res.redirect('/custom/profile/accuracy');
}));

// <-----------------------------AVARTAR_CUSTOM-------------------------------------->
ROUTER.get('/profile/avartar', ASYNC_HANDLER(async function getCustomProfile(req, res) {
    const IMAGE_ID = await IMAGE.findById(req.session.cusTomId);
    res.render('Avartar_Custom', { img: IMAGE_ID[IMAGE_ID.length - 1] });
}));

ROUTER.post('/profile/avartar', UPLOAD.single('avatar'), ASYNC_HANDLER(async function postCustomAvartar(req, res) {
    IMAGE.uploadFileImage(req.session.cusTomId, req.file.filename, req.file.path);
    res.redirect('/custom/profile/avartar');
}));

//  < -------------------------------IMAGE NUMBERATION ID 1------------------------------------------------->
ROUTER.get('/profile/accuracy/ImageNumberID1', ASYNC_HANDLER(async function getImageNumberNationID1(req, res) {
    const IMAGE_NUMBERNATION_ID1 = await IMAGEID.findById(req.session.cusTomId);
  
    res.render('Image_NumberNationID1', { img: IMAGE_NUMBERNATION_ID1[IMAGE_NUMBERNATION_ID1.length - 1] });
}));

ROUTER.post('/profile/accuracy/ImageNumberID1', UPLOAD.single('ImageNumberID1'), ASYNC_HANDLER(async function postNUmberNationID1(req, res) {
    const IMAGE_ID = IMAGEID.uploadFileImage(req.session.cusTomId, req.file.filename, req.file.path);
    res.redirect('/custom/profile/accuracy/ImageNumberID1');
}));

//  < -------------------------------IMAGE NUMBERATION ID 2------------------------------------------------->
ROUTER.get('/profile/accuracy/ImageNumberID2', ASYNC_HANDLER(async function getImageNumberNationID2(req, res) {
    const customid = req.session.cusTomId;
    const IMAGE_NUMBERNATION_ID1 = await IMAGEID.findById(customid);
    
        res.render('Image_NumberNationID2', { img: IMAGE_NUMBERNATION_ID1[IMAGE_NUMBERNATION_ID1.length - 1] });
    
    
}));

ROUTER.post('/profile/accuracy/ImageNumberID2', UPLOAD.single('ImageNumberID2'), ASYNC_HANDLER(async function postNUmberNationID2(req, res) {
    const IMAGE_ID = IMAGEID.uploadFileImage(req.session.cusTomId, req.file.filename, req.file.path);
    res.redirect('/custom/profile/accuracy/ImageNumberID2');
}));
module.exports = ROUTER;