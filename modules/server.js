//require('dotenv').config();

var nodemailer = require('nodemailer');
//'use strict';
// step 1
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    //user: process.env.EMAIL,
    //pass: process.env.PASSWORD
user: 'dstl_mike1@hotmail.com',
pass: '113Hopest!'
  }
});

//step 2
let mailOptions = {
  from: 'dstl_mike1@hotmail.com',
  to: 'dstl_mike1@hotmail.com, alexdeabot@gmail.com',
  subject: 'Testing and testing',
  text: 'It worked'
};

//step 3
transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log('error occured: ', err);
  } else {
    console.log('email sent!! ');
  }
});
