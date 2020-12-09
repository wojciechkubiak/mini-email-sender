require('dotenv').config();
const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser');
const path = require("path");
const port = process.env.PORT || "8000";

app.use(cors())
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).send("App is on");
});

app.post("/", (req, res) => {
    const date = new Date();

    let sql = `INSERT INTO mails(SENDER, SUBJECT, MAIL, DATE_SENT) VALUES (?)`;
    let values = [
        req.body.mail,
        req.body.subject,
        req.body.content,
        `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    ];
    db.query(sql, [values], function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "New mail"
      })
    })

    
    res.status(200).send("App is on");
});

app.listen(port, () => {
  console.log(`Listening to requests`);
});