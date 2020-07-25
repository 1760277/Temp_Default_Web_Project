<<<<<<< HEAD
module.exports=function logout(req,res){
    delete req.session.staffId;
    delete req.session.cusTomId;
    //req.session.clear();
    res.redirect('/');
=======
module.exports=function logout(req,res){
    delete req.session.UserId;
    delete req.session.cusTomId;
    res.redirect('/');
>>>>>>> fdc50d76c4fa705dbbc7fcdcd14b4b98db0cca02
}