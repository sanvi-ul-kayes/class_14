const { default: mongoose } = require("mongoose");

const oderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    quantity: { type: Number, default: 1, required: true },
    totalPrice: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    city: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    cartItems: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", oderSchema);
