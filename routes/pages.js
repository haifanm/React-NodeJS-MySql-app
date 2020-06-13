const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("request?????");
  res.send("<h1>home page</h1>");
});

router.get("/register", (req, res) => {
  res.send("<h1>register page</h1>");
});

router.get("/login", (req, res) => {
  res.send("<h1>login page</h1>");
});

module.exports = router;
