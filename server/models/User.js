const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: { type: String },
    email: { type: String },
    password: { type: String },
    verified: { type: Boolean, default: false },
    otp: {type : Object},
    address: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
