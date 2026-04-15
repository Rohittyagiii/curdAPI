const express = require("express");
const router = express.Router();
const User = require("../models/User");

// health
router.get("/health", (req, res) => {
  res.json({ status: "API is working" });
});

// get users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      msg: "Data found successfully",
      status: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// add user
router.post("/addusers", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        msg: "Name and email required",
        success:false,
      });
    }

    const user = new User({
  name: name,    
  email,
});
    const savedUser = await user.save();

    res.status(201).json({
      msg: "User added",
      data: savedUser,
      success:true,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

// delete user
router.delete("/deleteByID", async (req, res) => {
  try {
    const { deletedUserId } = req.body;

    if (!deletedUserId) {
      return res.status(400).json({
        msg: "UserId is required",
      });
    }

    const deletedUser = await User.findByIdAndDelete(deletedUserId);

    if (!deletedUser) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.json({
      msg: "User deleted successfully",
      user: deletedUser,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// update user (FIXED POSITION + BUG)
router.patch("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const userUpdated = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!userUpdated) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.json({
      msg: "User Updated Successfully",
      user: userUpdated,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;