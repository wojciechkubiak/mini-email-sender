require('dotenv').config();
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport( {
    service: 'Outlook365',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    }
});

const connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);

connection.connect( err => {
    if (err) throw err;

    connection.query("SELECT * FROM MAILS WHERE DATE_SENT = CURDATE()", function (err, result, fields) {
        if (err) throw err;
        
        let re = '';

        if(result.length) {
            result.forEach(element => {
                re += `\nSender: ${element.SENDER}\n`;
                re += `Subject: ${element.SUBJECT}\n`;
                re += `Message: ${element.MAIL}\n`;
            })
        }

        const mailOptions = {
            from: process.env.SENDER,
            to: process.env.RECEIVER,
            subject: 'Portfolio msg',
            text: re
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                connection.end();
            } else {
                connection.end();
            }
        });
        connection.end();
    });
});