<<<<<<< HEAD
const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const COOKIESSION = require('cookie-session');
const DB = require('./Model/db');
const PORT = process.env.PORT || 3000;

const app = EXPRESS();
app.use(COOKIESSION({
    name: 'session',
    keys: ['123456'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

app.set('views','./Views');
app.set('view engine', 'ejs');
app.use(BODY_PARSER.urlencoded({ extended: false }));

app.use(require('./Middleware/auth'));
app.use(require('./Middleware/staff_auth'));
app.use('/', require('./Controller/index'));
app.use('/login', require('./Controller/Account/login'));
app.use('/register', require('./Controller/Account/register'));
app.use('/custom', require('./Controller/custom'));
app.use('/staff', require('./Controller/Admin/staff'));
app.get('/logout',require('./Controller/Account/logout'));
app.use('/admin', require('./Controller/Admin/admin'));
app.use('/random',require('./Model/radomcustom'));
app.use('/payment',require('./Controller/Cutomer/payment'));
app.use('/inforaccount',require('./Controller/Cutomer/inforAccount'));
app.use('/savingAccount', require('./Controller/savingAccount'));

app.use(EXPRESS.static('Static'));

DB.sync().then(function () {
    app.listen(PORT);
    console.log(`http://localhost:${PORT}`);
}).catch(function (err) {
    console.log(err);
});
=======
const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const COOKIESSION = require('cookie-session');
const DB = require('./Model/db');
const PORT = process.env.PORT || 3000;

const app = EXPRESS();
app.use(COOKIESSION({
    name: 'session',
    keys: ['123456'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

app.set('views','./Views');
app.set('view engine', 'ejs');
app.use(BODY_PARSER.urlencoded({ extended: false }));

app.use(require('./Middleware/auth'));
app.use(require('./Middleware/staff_auth'));
app.use('/', require('./Controller/index'));
app.use('/login', require('./Controller/Account/login'));
app.use('/register', require('./Controller/Account/register'));
app.use('/custom', require('./Controller/custom'));
app.use('/staff', require('./Controller/Admin/staff'));
app.get('/logout',require('./Controller/Account/logout'));
app.use('/admin', require('./Controller/Admin/admin'));
app.use('/random',require('./Model/radomcustom'));
app.use('/paymentinbank',require('./Controller/Cutomer/paymentinbank'));
app.use('/inforaccount',require('./Controller/Cutomer/inforAccount'));
app.use('/savingAccount', require('./Controller/savingAccount'));

app.use(EXPRESS.static('Static'));

DB.sync().then(function () {
    app.listen(PORT);
    console.log(`http://localhost:${PORT}`);
}).catch(function (err) {
    console.log(err);
});
>>>>>>> fdc50d76c4fa705dbbc7fcdcd14b4b98db0cca02
