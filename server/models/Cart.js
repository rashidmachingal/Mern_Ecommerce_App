const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String },
    cartItems: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
