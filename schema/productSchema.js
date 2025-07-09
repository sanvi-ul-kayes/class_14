const { default: mongoose, mongo } = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: Array,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorie",
    },
    sellingPrice: {
      type: String,
    },
    discountPrice: {
      type: String,
    },
    stock: {
      type: Number,
    },
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
    rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rating",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
