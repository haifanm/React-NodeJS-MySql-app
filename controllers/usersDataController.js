const mysql = require("mysql");

//MySql database connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});
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

