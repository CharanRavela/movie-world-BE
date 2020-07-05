'use strict'
require('dotenv').config();

var crypto = require('crypto');
var Mailgen = require('mailgen');
var nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;


//Encryption
const encrypt = text => {
    if (text != null && text.length > 0) {
        var cipher = crypto.createCipher('aes192', process.env.PASS_SECRET);
        var crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    } else {
        return null;
    }
}

//Decryption
const decrypt = text => {
    var decipher = crypto.createDecipher('aes192', process.env.PASS_SECRET);
    if(text != null && text.length > 0) {
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    } else {
        return null;
    }
}

const sendInvoice = (data) => {
    if (process.env.isSendMail == "true") {
        return new Promise((resolve, reject) => {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                host: 'smtp.gmail.com',
                port: 465,
                secureConnection: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            var mailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: 'Mailgen',
                    link: 'https://mailgen.js/'
                }
            });
    
            var emailTemplate = {
                body: {
                    name: `${decrypt(data.user_booking_email)}`,
                    intro: `You booking is confirmed, you have booked ${data.no_of_seats_booked} Tickets and Your Booking ID ${data._id}.`,
                    outro: 'Thanks for choosing us!, we\'d love to help.'
                }
            };
            var emailBody = mailGenerator.generate(emailTemplate);

            let HelperOptions = {
                from: '"MovieWorld" <tickets@movieworld.com>',
                to: decrypt(data.user_booking_email),
                subject: "Your Tickets",
                html: emailBody
            };
            transporter.use('compile', htmlToText(HelperOptions));
            transporter.sendMail(HelperOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return reject({ success: false, message: error });
                } else {
                    // console.log("The message was sent!");
                    // console.log(info);
                    return resolve({ success: true, message: info });
                }
            });
        });
    }
};

module.exports = {

    encrypt: encrypt,
    decrypt: decrypt,
    sendInvoice: sendInvoice
    
}