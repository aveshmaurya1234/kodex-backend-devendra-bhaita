import mongoose from "mongoose";
import bcrypt from "bcrypt"

let userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    provider: {
        type: String,
        enum: ["google", "facebook", "local"],
    },
    providerId: {
        type: String,
    }

},{timestamps: true})

let userModel = mongoose.model("user", userSchema)

userSchema.pre("save", async function () {
  // prevent re-hashing
  if (!this.isModified("password")) {
    return;
  };

  this.password = await bcrypt.hash(this.password, 10);
}); 


// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default userModel;