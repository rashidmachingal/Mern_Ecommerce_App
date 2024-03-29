const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String },
    mobile: { type: String },
    verified: { type: Boolean, default: false },
    otp: {type : Object},
    address: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
