const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { addProjects, deleteUser, editField, login, getProjects, hideProject } = require ('./projectsController');
const { authJwt } = require ('./verifyJwt')
require("dotenv").config()

const app = express();


app.use(cors());

app.use(express.json({ limit: '50mb', extended: true }));

app.use(express.urlencoded({ extended: true }));

app.get('/projects', getProjects);
app.post('/add', authJwt, addProjects)
app.post('/authLogin', login)
app.delete("/delete/:id", authJwt, deleteUser)
app.patch("/edit/:id", authJwt, editField)
app.patch("/projects/hide/:id", authJwt, hideProject)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, phone, comments } = req.body;
  const file = req.files?.file;

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nComments: ${comments}`,
    attachments: file ? [{ filename: file.name, content: file.data }] : [],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('Email sent successfully');
  });
});



app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
})

