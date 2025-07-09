const categorySchema = require("../schema/categorySchema");
const fs = require("fs");
const path = require("path");
const hostUrl = process.env.HOST_URL;

//localhost:8989/api/v1/category/createCategory
async function createCategoryController(req, res) {
  try {
    let { name, description } = req.body;
    const images = req.file.filename;
    const createCategory = new categorySchema({
      name,
      description,
      image: hostUrl + images,
    });
    await createCategory.save();
    res.send({
      success: true,
      msg: "Category is created successfully",
      data: createCategory,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

//localhost:8989/api/v1/category/allCategory
async function allCategoryController(req, res) {
  try {
    const allCategory = await categorySchema.find();
    res.status(200).send({
      success: true,
      msg: "All category fetch successfully",
      data: allCategory,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

//localhost:8989/api/v1/category/singleCategory/
async function singleCategoryController(req, res) {
  let { id } = req.params;
  try {
    const singleCategory = await categorySchema.findOne({ _id: id });
    res.status(200).send({
      success: true,
      msg: "Single Category fetched successfully",
      data: singleCategory,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

//localhost:8989/api/v1/category/deleteCategory/
async function deleteCategoryController(req, res) {
  let { id } = req.params;
  try {
    const deleteCategory = await categorySchema.findOneAndDelete({ _id: id });
    const categoryimages = deleteCategory.image.split("/").pop();
    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${categoryimages}`,
      (err) => {
        if (err) {
          res.status(400).send({ msg: "Invalid Image", err });
        } else {
          res.status(200).send({
            success: true,
            msg: "Category Deleted successfully",
            data: deleteCategory,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
}

//localhost:8989/api/v1/category/updateCategory/
async function updateCategoryController(req, res) {
  let { id } = req.params;
  let { name, description } = req.body;
  const images = req.file.filename; //new Image
  try {
    const updateCategory = await categorySchema.findOneAndUpdate(
      { _id: id },
      { name, description, image: hostUrl + images }
    );
    const updateCategoryImage = updateCategory.image.split("/").pop();
    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${updateCategoryImage}`,
      (err) => {
        if (err) {
          res.status(400).send({ msg: "Invalid Image", err });
        } else {
          res.status(200).send({
            success: true,
            msg: "Category updated successfully",
            data: updateCategory,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  createCategoryController,
  singleCategoryController,
  allCategoryController,
  deleteCategoryController,
  updateCategoryController,
};
