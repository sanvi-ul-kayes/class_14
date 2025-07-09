const express = require("express");
const {
  createCategoryController,
  allCategoryController,
  singleCategoryController,
  deleteCategoryController,
  updateCategoryController,
} = require("../../controllers/categoryController");
const upload = require("../../middleWare/uploadImageMiddleWare");
const router = express.Router();

//localhost:8989/api/v1/category/createCategory
router.post(
  "/createCategory",
  upload.single("image"),
  createCategoryController
);

//localhost:8989/api/v1/category/deleteCategory
router.delete(
  "/deleteCategory/:id",
  upload.single("image"),
  deleteCategoryController
);

//localhost:8989/api/v1/category/updateCategory
router.patch(
  "/updateCategory/:id",
  upload.single("image"),
  updateCategoryController
);

//localhost:8989/api/v1/category/allCategory
router.get("/allCategory", allCategoryController);

//localhost:8989/api/v1/category/singleCategory
router.get("/singleCategory/:id", singleCategoryController);

module.exports = router;
