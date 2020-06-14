const express = require("express");

const router = express.Router();

router.get("/app", (req, res) => {
  console.log("request?????");
  res.send("<h1>nodejs app page</h1>");
});

module.exports = router;
