const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

//routes
const productRoute = require("./routes/products.js")


// middlewares
app.use(cors());
app.use(express.json());
app.use("/api", productRoute);


// mongodb connection + // server configuration
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