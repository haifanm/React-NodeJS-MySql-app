const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dbconfig = require('../db.config');
const { response } = require("express");

//MySql database connection
const db = mysql.createPool(dbconfig);

//accepts the username and the access token 
exports.viewProfile = (req, res) => {

  const username  = req.username;

  //get profile data from database
  db.query(
    "SELECT username,email,age,phone,company,country FROM users WHERE username = ?",
    [username],
    async (error, results) => {
      if (error) {
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

exports.deleteProfile = (req, res) => {

  const username = req.username;

  db.query(
    "DELETE FROM users WHERE username = ?",
    [username],
    async (error, results) => {
      if (error) {
        res.status(403).json({
          message: error.message,
        });
      }

      res.status(200).json({
        message: "deleted"
      });

    }
  );
};


exports.editProfile = async (req, res) => {
  try{
    const username = req.username;

    let newData = req.body;

    if(newData.email)   await setData("email",newData.email,username)
    if(newData.age)   await setData("age",newData.age,username)
    if(newData.phone)   await setData("phone",newData.phone,username)
    if(newData.country)   await setData("country",newData.country.label,username)
    if(newData.company)   await setData("company",newData.company,username)

    res.status(200).json({
      message: "edited"
    });
  }
  catch(err) {
    console.log(err)
  }

};

const setData = async (param,value, username) => {
  await db.query(
    `UPDATE users SET ${param} = \'${value}\' WHERE username = ?`,
    [username],
    async (error, results) => {
      if (error) {
        console.log(error)
      }
    }
  );



};