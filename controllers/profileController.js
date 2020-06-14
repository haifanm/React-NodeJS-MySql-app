const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dbconfig = require('../db.config');

//MySql database connection
const db = mysql.createPool(dbconfig);

//accepts the username and the access token 
exports.viewProfile = (req, res) => {


  const { username } = req.username;

  //get profile data from database
  db.query(
    "SELECT username,email,age,phone,company,country FROM users WHERE username = ?",
    ["haifanaim"],
    async (error, results) => {
      if (error) {
        // console.log(error.message);
        res.status(403).json({
          message: error.message,
        });
      }

      //send back profile data
      if (results.length > 0) {
        const profile=results[0];
        res.json({
          profile
        });

      }

    }
  );
};

