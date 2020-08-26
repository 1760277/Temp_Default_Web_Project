const  NODEMAILER = require('nodemailer');

const EMAIL_USERNAME = process.env.EMAIL_USERNAME || 'phannghiem2503@gmail.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'ca1ro6phi';

async function send(to,subject,content){
    const transporter = NODEMAILER.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'phannghiem2503@gmail.com',//process.env.EMAIL_USERNAME,
          pass: 'ca1ro6phi',//process.env.EMAIL_PASSWORD,
        }
      });
      transporter.sendMail({
        from: 'phannghiem2503@gmail.com',//process.env.EMAIL_USERNAME,
        to,
        subject,
        text: content,
});
}
module.exports= { send }