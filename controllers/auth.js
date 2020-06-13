const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//MySql database connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.register = (req, res) => {
  console.log(req.body);

  const { username, email, age, phone, country, company, password } = req.body;

  db.query(
    "SELECT username FROM users WHERE username = ?",
    [username],
    async (error, results) => {
      if (error) {
        console.log(error.message);
        res.json({
          message: error.message,
        });
      }

      if (results.length > 0) {
        console.log("username already exists");
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
        console.log("results:");
        console.log(results);
        try {
          console.log("comparing here: "+password+" and "+results[0].password);
          if (
            !results>0 ||
            !(password === results[0].password)
          ) {
            res.json({
              message: "Incorrent login credentials",
            });
            console.log("Incorrent login credentials");
            return;
          } else {
            const id = results[0].username;
            res.status(200).json({
              message: "loggedin",
            });
            return;
            //cookies
            // const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            //   expiresIn: process.env.JWT_EXPIRES_IN,
            // });

            // console.log("token: " + token);

            // const cookieOptions = {
            //   expires: new Date(
            //     Date.now() +
            //       process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            //   ),
            //   httpOnly: true,
            // };

            // res.cookie("jwt", token, cookieOptions);
            // res.status(200);
          }
        } catch (error) {
          res.json({
            message: error.message,
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
