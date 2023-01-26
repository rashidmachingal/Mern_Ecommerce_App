const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: { type: String },
  second_name: { type: String },
  email: { type: String },
  password: { type: String },
  verified: { type: Boolean, default: false },
  address: { type: Array },
});

module.exports = mongoose.model("User", UserSchema);
