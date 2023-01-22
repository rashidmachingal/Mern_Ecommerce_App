const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: String },
  cartItems: { type: Array },
});

module.exports = mongoose.model("Cart", CartSchema);
