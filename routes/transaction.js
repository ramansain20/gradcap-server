const express = require("express");
const jwt = require("jsonwebtoken");
const trans = require("../controllers/trans");
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

router.get("/transactions/sender/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No ID defined" });
    }
    const data = await trans.senderTrans(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/transactions/receiver/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No ID defined" });
    }
    const data = await trans.receiverTrans(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/transactions/landOwner", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No ID defined" });
    }
    const data = await trans.transLandOwner(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/transactions/org", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No ID defined" });
    }
    const data = await trans.transOrg(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
