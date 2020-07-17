module.exports=function logout(req,res){
    delete req.session.UserId;
    delete req.session.cusTomId;
    res.redirect('/');
}