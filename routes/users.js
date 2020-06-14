const jwt = require("jsonwebtoken");
const express = require("express");
const usersDataController = require("../controllers/usersDataController");

const router = express.Router();


router.get("/", usersDataController.getUsersData);

module.exports = router;

