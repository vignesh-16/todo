const express = require('express');
const mailer = express.Router();
const mailser = require('nodemailer');

const serviceManager = mailser.createTransport({
    service: process.env.service,
    auth: {
      user: process.env.mail_address, 
      pass: process.env.mail_pass, 
    }
});


mailer.post('/send',async(req,res) => {
  let { to, subject, content } = req.body;
  const mailOptions = {
    from: process.env.mail_address,
    to: to,
    subject: subject,
    text: content
  };

  serviceManager.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({
        isSuccess: false,
        error: error
      })
      return console.log(error);
    }
    res.status(200).json({
      isSuccess: true,
      info: info
    })
    console.log('Message sent: %s', info.messageId);
  });
})

module.exports = mailer;