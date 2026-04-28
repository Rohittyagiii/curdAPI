const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // converts email to lowercase
      trim: true,
    },
    password: {
      type: String, // ✅ fixed
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);