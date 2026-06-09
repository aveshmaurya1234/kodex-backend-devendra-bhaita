const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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

    mobile: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving in database
userSchema.pre("save", async function () {
  // prevent re-hashing
  if (!this.isModified("password")) {
    return;
  };

  this.password = await bcrypt.hash(this.password, 10);
}); 

// Create JWT token
userSchema.methods.createToken = function () {
  return jwt.sign( { id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;