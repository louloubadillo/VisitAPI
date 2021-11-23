const express = require('express');
const mysql = require('mysql')
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const connection = require('./connection')
require('dotenv').config()

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('static'));
app.use(cookieParser());


//Routes
const indexRoutes = require('./routes/indexroutes');

app.use('/', indexRoutes);


// PORT
//const port = 3000;
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));