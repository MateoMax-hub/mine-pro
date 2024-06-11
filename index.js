const express = require('express');
const cors = require('cors');
const { addProjects, deleteUser, editField, login, getProjects } = require ('./projectsController');
const { authJwt } = require ('./verifyJwt')
require("dotenv").config()

const app = express();


app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get('/projects', authJwt, getProjects);
app.post('/add', authJwt, addProjects)
app.post('/authLogin', login)
app.delete("/delete/:id", authJwt, deleteUser)
app.patch("/edit/:id", authJwt, editField)



app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
})

