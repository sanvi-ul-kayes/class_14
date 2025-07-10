const cartSchema = require("../schema/cartSchema");

//localhost:8989/api/v1/cart/createCart
async function createCartController(req, res) {
  try {
    let { user, product, price, quantity } = req.body;
    const createCart = new cartSchema({
      user,
      product,
      price,
      quantity,
    });
    await createCart.save();
    res.status(201).send({
      success: true,
      msg: "cart created successfully",
      data: createCart,
    });
  } catch (error) {
    res.status(500).send({ msg: "Invalid credantial", data: error });
  }
}

//localhost:8989/api/v1/cart/singleCartUser/
async function singleCartUserController(req, res) {
  try {
    let { id } = req.params;
    const singleCartUser = await cartSchema.findOne({ user: id });
    if (singleCartUser) {
      res
        .status(200)
        .send({ success: true, msg: "Single Cart User", data: singleCartUser });
    } else {
      res.status(404).send("User not Found");
    }
  } catch (error) {
    res.status(500).send({ msg: "Invalid credantial", data: error });
  }
}

//localhost:8989/api/v1/cart/incrementCart/
async function incrementcartController(req, res) {
  try {
    let { id } = req.params;
    const incrementCart = await cartSchema
      .findOne({ _id: id })
      .populate("product");
    if (incrementCart) {
      if (incrementCart.product.stock > incrementCart.quantity) {
        incrementCart.quantity++;
        await incrementCart.save();
        res
          .status(200)
          .send({ msg: "Cart Incremented successfully", data: incrementCart });
      } else {
        res.status(200).send("Out of Stock");
      }
    } else {
      res.status(404).send("Cart not found");
    }
  } catch (error) {
    res.status(500).send({ msg: "Invalid credantial", data: error });
  }
}

//localhost:8989/api/v1/cart/decrementCart/
async function decrementCartController(req, res) {
  try {
    let { id } = req.params;
    const decrementCart = await cartSchema.findOne({ _id: id });
    if (decrementCart) {
      if (decrementCart.quantity > 1) {
        decrementCart.quantity--;
        await decrementCart.save();
      }
      res
        .status(200)
        .send({ msg: "Cart Incremented successfully", data: decrementCart });
    } else {
      res.status(404).send("Cart not found");
    }
  } catch (error) {
    res.status(500).send({ msg: "Invalid credantial", data: error });
  }
}

//localhost:8989/api/v1/cart/deleteCart/
async function deleteCartController(req, res) {
  try {
    let { id } = req.params;
    const deleteCart = await cartSchema.findOneAndDelete({ _id: id });
    res
      .status(200)
      .send({ msg: "cart deleted successfully", data: deleteCart });
  } catch (error) {
    res.status(500).send({ msg: "Invalid credantial", data: error });
  }
}

module.exports = {
  createCartController,
  singleCartUserController,
  incrementcartController,
  decrementCartController,
  deleteCartController,
};
