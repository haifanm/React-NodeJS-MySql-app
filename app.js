const morgan = require("morgan");
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const path = require('path');
const dbconfig = require('./db.config');

dotenv.config({ path: "./.env" });

//Routes
const app = express();
const PORT = process.env.PORT || 5000;


//MySql database connection
const db = mysql.createPool(dbconfig);
// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE,
// });

//parse url encoded bodies (as sent by form)
app.use(express.urlencoded({ extended: false }));
//oarse json bodies (as sent by api clients)
app.use(express.json());

app.use(cookieParser());

//Static file declaration
app.use(express.static(path.join(__dirname, 'react-app/build')));



// db.connect((error) => {
//   if (error) console.log(error);
//   else console.log("mysql connected!!");
// });

//HTTP request logger
app.use(morgan("tiny"));


//Define Routes 

app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/users", require("./routes/users"));
// app.use("/", require("./routes/pages"));


//production mode
if(process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, 'react-app/build')));  //  
  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'react-app/build/index.html'));  })
}

//build mode
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/react-app/public/index.html'));})


app.listen(PORT, console.log(`Server started at port ${PORT}`));
