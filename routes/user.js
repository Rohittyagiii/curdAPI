const express = require('express');

const router = express.Router();
const User = require("../models/User");

router.get("/health", (req, res) => {
  res.json({ status: "API is working" });
});

module.exports = router;
