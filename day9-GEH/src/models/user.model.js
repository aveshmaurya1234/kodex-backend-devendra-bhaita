const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: [true, "Email should be unique"],
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);


const UserModel = mongoose.model("geh", userSchema);

module.exports = UserModel;