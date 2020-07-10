const {Router} = require('express');
const ROUTER = new Router();

ROUTER.get('/', function getHomePage(req, res){
    res.render('Index')
});

ROUTER.get('/accuracy', function getAccuracyInfo(req, res){

    res.render('Accuracy_Info');
}),

module.exports = ROUTER;