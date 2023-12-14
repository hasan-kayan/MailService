const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: '',
  },
});

// Read HTML content from a file
const htmlContent = fs.readFileSync('./src/html/index.html', 'utf-8');


app.post('/send-mail', (req, res) => {
  console.log("Requested")
  const { to, subject, html } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: subject || 'Hello from Your App',
    html: htmlContent,
  };
  console.log(htmlContent)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
