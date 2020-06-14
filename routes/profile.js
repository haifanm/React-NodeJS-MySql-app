const jwt = require("jsonwebtoken");
const express = require("express");
const profileController = require("../controllers/profileController");

const router = express.Router();


router.delete("/", authenticateToken ,profileController.deleteProfile);
router.put("/", authenticateToken ,profileController.editProfile);
router.get("/", authenticateToken ,profileController.viewProfile);


function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(token == null){
    return res.status(403).json({
      message: "noaccess"
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, username) => {
    if(err){
        return res.status(403).json({
          message: "noaccess"
        })
    }

    req.username = username;
    next();
  })
}

module.exports = router;

