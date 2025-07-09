const express = require("express");
const {
  createProductController,
  allProductController,
  singleProductController,
  deleteProductController,
  updatedProductController,
} = require("../../controllers/productController");
const upload = require("../../middleWare/uploadImageMiddleWare");
const router = express.Router();

//localhost:8989/api/v1/product/createProduct
router.post("/createProduct", upload.array("images"), createProductController);

//localhost:8989/api/v1/product/deleteProduct/
router.delete(
  "/deleteProduct/:id",
  upload.array("images"),
  deleteProductController
);

//localhost:8989/api/v1/product/updateProduct/
router.patch(
  "/updateProduct/:id",
  upload.array("images"),
  updatedProductController
);

//localhost:8989/api/v1/product/allProduct
router.get("/allProduct", allProductController);

//localhost:8989/api/v1/product/singleProduct/
router.get("/singleProduct/:id", singleProductController);

module.exports = router;
