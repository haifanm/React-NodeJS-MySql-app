const morgan = require("morgan");
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./.env" });

//Routes
const app = express();
const PORT = process.env.PORT || 5000;

//MySql database connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//parse url encoded bodies (as sent by form)
app.use(express.urlencoded({ extended: false }));
//oarse json bodies (as sent by api clients)
app.use(express.json());

app.use(cookieParser());

db.connect((error) => {
  if (error) console.log(error);
  else console.log("mysql connected!!");
});

//HTTP request logger
app.use(morgan("tiny"));


//Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, console.log(`Server started at port ${PORT}`));
