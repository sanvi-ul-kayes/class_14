const express = require("express");
const createCategoryController = require("../../controllers/categoryController");
const upload = require("../../middleWare/uploadImageMiddleWare");
const router = express.Router();

//localhost:8989/api/v1/category/createCategory
router.post(
  "/createCategory",
  upload.single("image"),
  createCategoryController
);

module.exports = router;
