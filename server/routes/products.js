const express = require("express");
const router = express.Router();

// add product
router.get("/create-product", (req, res) => {
    res.json({data:"Hello World!"})
});





module.exports = router;