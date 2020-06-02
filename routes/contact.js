const router = require('express').Router();
const path = require('path');
const nodemailer = require('nodemailer');
const credentials = require("../config/emailCredentials");

router.get("/sendMail", (req, res) => {
    if(req.session.user) {
        return res.sendFile(path.join(__dirname, '../public/sendMail.html'));
    } else {
        return res.redirect('/login')
    }
});

router.post("/sendMail", async (req, res) => {

    const {text} = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
        type: 'OAuth2',
        user: credentials.user,
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        refreshToken: credentials.refreshToken
        }
    });
        
        let mailOptions = {
            to: 'anna.maria.wilczek@gmail.com',
            subject: "Request from my page",
            text: text
        };
        
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
             return console.log(error.message);
          }
        }); 
        //on success - sweetalert 
    });

module.exports = router;