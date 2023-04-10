const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

//routes
const authRoute = require("./routes/auth.js")
const productRoute = require("./routes/products.js")
const cartRoute = require("./routes/cart.js")


// middlewares
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);


// mongodb connection + server configuration
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`DB connection succesful & Backend server running`);
    });
  })
  .catch((err) => {
    console.log(err);
  });