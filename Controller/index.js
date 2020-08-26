const {Router} = require('express');
const ROUTER = new Router();

ROUTER.get('/', function getHomePage(req, res){
    res.render('Index')
});

module.exports = ROUTER;