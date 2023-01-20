const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    images: { type: Array },
    brand_name: { type: String },
    title: { type: String },
    real_price: { type: Number },
    offer_price: { type: Number },
    description: { type: String },
    category: { type: String },
    sizes: { type: Array },
    in_stock: { type: Boolean, default: true },
    stock_count: { type: Number },
    other_details: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema)