const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../controllers/auth");
const landOwnerAccount = require("../models/landOwnerAccount");
const router = express.Router();
var crypto = require('crypto');

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, aadhar) => {
    if (err) return res.sendStatus(403);
    req.aadhar = aadhar;
    next();
  });
}


router.post("/login/landowner", async (req, res) => {
  let { aadhar, otp} = req.body;
  //send otp to mobile number
  const owner=await landOwnerAccount.find({aadhar:aadhar}).populate('land');
  if(!owner){
    res.status(404).json({ message: "Cannot find user" });
  }
  else if(owner && owner.otp===otp){
    res.status(200).json({owner})
  }
  else 
    res.status(404).json({ message: "Internal Server Error" });
});


module.exports = router;
