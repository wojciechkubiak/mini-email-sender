require('dotenv').config();

// const nodeOutlook = require('nodejs-nodemailer-outlook');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    }
});
const qs = require('querystring')

const requestHandler = (req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    };
    const url = req.url;
    const method = req.method;

    res.writeHead(200, headers);


    if(url === "/" && method === "POST") {
        const body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const json = qs.parse(parsedBody);

            const mailOptions = {
                from: process.env.SENDER,
                to: process.env.RECEIVER,
                subject: json.subject,
                text: `${json.content}\n\nAuthor: ${json.email}`,
                replyTo: json.email
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.end();
                } else {
                    res.end();
                }
            });
        })
    }
}

exports.handler = requestHandler;
