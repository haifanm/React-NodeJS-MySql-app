const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dbconfig = require('../db.config');

//MySql database connection
const db = mysql.createPool(dbconfig);

exports.register = (req, res) => {

  const { username, email, age, phone, country, company, password } = req.body;

  db.query(
    "SELECT username FROM users WHERE username = ?",
    [username],
    async (error, results) => {
      if (error) {
        res.json({
          message: error.message,
        });
      }

      if (results.length > 0) {
        res.json({
          message: "username already exists",
        });
        return;
      }


      db.query(
        "INSERT INTO users SET ?",
        {
          username: username,
          email: email,
          age: age,
          phone: phone,
          country: country.label,
          company: company,
          password: password,
        },
        (error, results) => {
          if (error) {
            console.log(error);
            res.json({
              message: error.message,
            });
          } else {
            res.status(200).json({
              message: "added",
            });
          }
        }
      );
    }
  );
};

exports.login = async (req, res) => {

  try {
    const { username, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (error, results) => {
        try {
          const valid = await bcrypt.compare(password, results[0].password);

          if (
            !results>0 ||
            !(valid)
          ) {
            res.json({
              message: "Incorrent login credentials",
            });
            return;
          } else {
            
            //access token
            const token = jwt.sign( username , process.env.JWT_SECRET);

            res.status(200).json({
              message: "loggedin",
              token: token
            });
          }
        } catch (error) {
          res.json({
            message: "Incorrent login credentials",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};
