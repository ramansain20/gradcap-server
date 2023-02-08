const express = require("express");
const jwt = require("jsonwebtoken");
const org = require("../controllers/org");
const router = express.Router();

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, pan) => {
    if (err) return res.sendStatus(403);
    req.pan = pan;
    next();
  });
}

router.post("/sendOtp", async (req, res) => {
  try {
    const { pan, cin } = req.body;
    if (!pan || !cin) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const data = await org.sendOtp(pan, cin);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/verifyOtp", authenticateUser, async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const data = await org.verifyOtp(otp, req.pan);
    if (data == false) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    res.send(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
