// const MULTER = require('multer');
// const PATH = require('path');

// const STORAGE = MULTER.diskStorage({
//     destination:'./user/images/',
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + '-' + Date.now()+ PATH.extname(file.originalname));
//     }
// });
// const UPLOAD = MULTER({
//     storage: STORAGE
// }).single('img-profile');

// module.exports = UPLOAD;