module.exports=function logout(req,res){
    delete req.session.staffId;
    delete req.session.cusTomId;
    //req.session.clear();
    res.redirect('/');
}