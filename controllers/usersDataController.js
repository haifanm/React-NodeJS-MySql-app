const mysql = require("mysql");
const dbconfig = require('../db.config');

//MySql database connection
const db = mysql.createPool(dbconfig);

//accepts the username and the access token 
exports.getUsersData = (req, res) => {

  //get profile data from database
  db.query(
    "SELECT username,email,age,phone,company,country FROM users",
    async (error, results) => {
      if (error) {
        console.log(error.message);
        res.json({
          message: error.message,
        });
      }

      //send back users data
      if (results.length > 0) {
        res.json({
          results
        });
      }

      else{
        res.json({
            message: "No data"
          });
      }

    }
  );
};

