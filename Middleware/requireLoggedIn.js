module.exports=function requireLoggedIn (req, res,next){
    if(!req.currentCustom || !req.currentStaff){
        res.redirect('/');
    }else{
        next();
    }
};