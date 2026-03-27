const express = require('express');

const router = express.Router();
const User = require("../models/User");

router.get("/health", (req, res) => {
  res.json({ status: "API is working" });
});

router.get("/users", async(req,res) => {
    const users = await User.find()
    res.json({status:"Get all Users"},users);
})

router.post("/users", async(req,res) => {
  const user = new User(req.body)
    const savedUser = await user.save();
     res.status(201).json(savedUser);
});



module.exports = router;
