const productSchema = require("../schema/productSchema");
const hostUrl = process.env.HOST_URL;
const fs = require("fs");
const path = require("path");
const categorySchema = require("../schema/categorySchema");

//localhost:8989/api/v1/product/createProduct
async function createProductController(req, res) {
  try {
    let {
      name,
      description,
      category,
      sellingPrice,
      discountPrice,
      rating,
      review,
      stock,
    } = req.body;
    const images = req.files.map((item) => `${hostUrl + item.filename}`);
    const createProduct = new productSchema({
      name,
      description,
      category,
      sellingPrice,
      discountPrice,
      rating,
      review,
      stock,
      image: images,
    });
    await createProduct.save();
    await categorySchema.findOneAndUpdate(
      { _id: category },
      { $set: { product: createProduct._id } },
      { new: true }
    );
    res.status(201).send({
      success: true,
      msg: "Product Created successfully",
      data: createProduct,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

//localhost:8989/api/v1/product/allProduct
async function allProductController(req, res) {
  try {
    const allProduct = await productSchema.find();
    res.status(200).send({
      success: true,
      msg: "Products fetched successfully ",
      data: allProduct,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

//localhost:8989/api/v1/product/singleProduct/
async function singleProductController(req, res) {
  try {
    let { id } = req.params;
    const singleProduct = await productSchema.findOne({ _id: id });
    res.status(200).send({
      success: true,
      msg: "Single Product fetched successfully",
      data: singleProduct,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

//localhost:8989/api/v1/product/deleteProduct/
async function deleteProductController(req, res) {
  let { id } = req.params;
  try {
    const deleteProduct = await productSchema.findOneAndDelete({ _id: id });
    const productImage = deleteProduct.image.map((item) =>
      item.split("/").pop()
    );
    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${productImage}`,
      (err) => {
        if (err) {
          res.status(404).send({ msg: "Image is not found" });
        } else {
          res.status(200).send({
            success: true,
            msg: "Product deleted successfully",
            data: deleteProduct,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
}

//localhost:8989/api/v1/product/updateProduct/
async function updatedProductController(req, res) {
  let { id } = req.params;
  try {
    let {
      name,
      description,
      category,
      sellingPrice,
      discountPrice,
      rating,
      review,
      stock,
    } = req.body;
    const images = req.files.map((item) => hostUrl + item.filename);

    const updateProduct = await productSchema.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        image: images,
      }
    );
    const oldProductImage = updateProduct.image;
    oldProductImage.forEach((element) => {
      const oldProductImageArray = element.split("/").pop();
      fs.unlink(
        `${path.join(__dirname, "../uploads")}/${oldProductImageArray}`,
        (err) => {
          if (err) {
            res.status(404).send({ msg: "Image is not found" });
          } else {
            res.status(200).send({
              success: true,
              msg: "Product updated successfully",
              data: updateProduct,
            });
          }
        }
      );
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  createProductController,
  allProductController,
  singleProductController,
  deleteProductController,
  updatedProductController,
};
