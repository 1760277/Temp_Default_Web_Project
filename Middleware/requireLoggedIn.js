module.exports=function requireLoggedIn (req, res,next){
    if(!req.currentCustom){
        res.redirect('/');
    }else{
        next();
    }
};