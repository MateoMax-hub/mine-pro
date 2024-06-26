const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
const { addProjects, deleteUser, editField, login, getProjects, hideProject, sendMail } = require('./projectsController');
const { authJwt } = require('./verifyJwt');
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: 'https://mine-project-one.vercel.app/',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get('/projects', getProjects);
app.post('/add', authJwt, addProjects);
app.post('/authLogin', login);
app.delete("/delete/:id", authJwt, deleteUser);
app.patch("/edit/:id", authJwt, editField);
app.patch("/projects/hide/:id", authJwt, hideProject);
app.post('/send-email', upload.single('file'), sendMail);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
