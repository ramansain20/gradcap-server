const express = require("express");
const jwt = require("jsonwebtoken");
const land = require("../controllers/land");
const router = express.Router();

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

router.get("/land/:id",authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Land Id is not specified" });
    }
    const data = await land.getLandById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/owner/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Owner Id not spefieied" });
    }
    const data = await land.getLandByOwnerId(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/landowner/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Owner Id not spefieied" });
    }
    const data = await land.getOwnerByLandId(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/ownerland/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Owner Id not spefieied" });
    }
    const data = await land.getOwnerByLandId(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/allreg", authenticateUser, async (req, res) => {
  try {
    const data = await land.getAllResisteredLand();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/registeredOwner/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Owner Id not spefieied" });
    }
    const data = await land.getOwnerRegisteredLand(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/verifiedOwnerLand/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Owner Id not spefieied" });
    }
    const data = await land.getOwnerVerifiedLand(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/wallet/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Owner Id not spefieied" });
    }
    const data = await land.getWalletBalance(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/wallet/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Owner Id not spefieied" });
    }
    const data = await land.getWalletBalance(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/dimension/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Owner Id not spefieied" });
    }
    const data = await land.getDimensions(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
