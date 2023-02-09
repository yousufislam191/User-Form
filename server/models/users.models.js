const mongoose = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: isEmail,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      validate: isStrongPassword,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
