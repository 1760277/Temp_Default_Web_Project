module.exports=function requireLoggedInStaff (req, res,next){
    if(!req.currentStaff){
        res.redirect('/');
    }else{
        next();
    }
};