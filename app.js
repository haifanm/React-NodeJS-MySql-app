const morgan = require("morgan");
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

const path = require('path');
const dbconfig = require('./db.config');

dotenv.config({ path: "./.env" });

//Routes
const app = express();
const PORT = process.env.PORT || 5000;

//MySql database connection
const db = mysql.createPool(dbconfig);

//parse url encoded bodies (as sent by form)
app.use(express.urlencoded({ extended: false }));

//parse json bodies (as sent by api clients)
app.use(express.json());

//Static file declaration
app.use(express.static(path.join(__dirname, 'react-app/build')));

//HTTP request logger
app.use(morgan("tiny"));

//Define Routes 
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/users", require("./routes/users"));

//production mode
if(process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, 'react-app/build')));  //  
  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'react-app/build/index.html'));  })
}

//build mode
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/react-app/public/index.html'));})



app.listen(PORT, console.log(`Server started at port ${PORT}`));
