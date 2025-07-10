const express = require("express");
const {
  createCartController,
  singleCartUserController,
  incrementcartController,
  decrementCartController,
  deleteCartController,
} = require("../../controllers/cartController");
const router = express.Router();

//localhost:8989/api/v1/cart/createCart
router.post("/createCart", createCartController);

//localhost:8989/api/v1/cart/singleCartUser/
router.get("/singleCartUser/:id", singleCartUserController);

//localhost:8989/api/v1/cart/incrementCart/
router.patch("/incrementCart/:id", incrementcartController);

//localhost:8989/api/v1/cart/decrementCart/
router.patch("/decrementCart/:id", decrementCartController);

//localhost:8989/api/v1/cart/deleteCart/
router.delete("/deleteCart/:id", deleteCartController);

module.exports = router;
