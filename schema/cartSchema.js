const { default: mongoose } = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    price: { type: Number },
    quantity: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
