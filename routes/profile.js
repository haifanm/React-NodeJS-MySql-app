const jwt = require("jsonwebtoken");
const express = require("express");
const profileController = require("../controllers/profileController");

const router = express.Router();

// router.put("/edit", authenticateToken, profileController.editProfile);

router.get("/", authenticateToken ,profileController.viewProfile);


function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(token == null){
    // return res.sendStatus(401).json({
    //     message: "Error verifying user."
    // })
    return ;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, username) => {
    if(err){
         return res.sendStatus(403).json({
              message: "noaccess"
        })
        return ;
    }

    req.username = username;
    next();
  })
}

module.exports = router;

