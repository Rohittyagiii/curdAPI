const express = require("express");

const router = express.Router();
const User = require("../models/User");

router.get("/health", (req, res) => {
  res.json({ status: "API is working" });
});

router.get("/users", async (req, res) => {
  const users = await User.find();
  let abc = {
    msg: "Data found successfully",
    status: true,
    data: users,
  };
  res.json(abc);
});

router.post("/addusers", async (req, res) => {
  const user = new User(req.body);
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

router.delete("/deleteByID", async (req, res) => {
  const {deletedUserId} = req.body;
   
  if (!deletedUserId) {
    return res.status(400).json({
      msg: "UserId is not found in request payload",
      myid:deletedUserId
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

    router.patch("/updateUser/:id",async(req,res) => {
       const { id } = req.params;
    const updateData = req.body;

      if(!updateUser){
        return res.status(400).json({
          msg:"The User is not updated"
        })
      }

      const userUpdated = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

      res.json({
        msg:"User Updated Successfully",
        user:userUpdated,
      })
    })
  
});

module.exports = router;
