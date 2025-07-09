const express = require("express");
const router = express.Router();
const auth = require("./auth");
const category = require("./category");
const product = require("./product");
const cart = require("./cart");

//localhost:8989/api/v1/auth
router.use("/auth", auth);

//localhost:8989/api/v1/category
router.use("/category", category);

//localhost:8989/api/v1/product
router.use("/product", product);

//localhost:8989/api/v1/cart
router.use("/cart", cart);

module.exports = router;
