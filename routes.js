require('dotenv').config();

const nodeOutlook = require('nodejs-nodemailer-outlook')
const qs = require('querystring')

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;


    if(url === "/" && method === "POST") {
        const body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const json = qs.parse(parsedBody);

            sendMail(json.email, json.subject, `${json.content}\n${json.email}`);
            res.end();
        })
    }
}

const sendMail = (mail, subject, content) => {
    nodeOutlook.sendEmail({
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD
        },
        from: process.env.SENDER,
        to: process.env.RECEIVER,
        subject: subject,
        text: content,
        replyTo: mail,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    })
}
exports.handler = requestHandler;