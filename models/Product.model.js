const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Name is required."],
  },
  desc: {
    type: String,
    required: [true, "Description is required."],
  },
  img: {
    type: String,
    default: "image.png",
  },
  categories: {
    type: String,
    enum: ["men", "women", "boys","girls"],
    required: [true, "Category is required."],
  },
  // size: {
  //   type: String,
  //   required: [true, "size is required."],
  // },
  availability: {
    type: String,
    required: [true, "Availability is required."],
  },
  inStock: {
    type: Boolean,
    required: [true, "InStock is  required."],
    default: true
  },
  price:{
    type:Number,
    required: [true, "Price is  required."],
  }
});


const Product = model("Product", productSchema);

module.exports = Product;






// const { Schema, model } = require("mongoose");

// const productSchema = new Schema({
//   title: {
//     type: String,
//     required: [true, "Name is required."],
//   },
//   desc: {
//     type: String,
//     required: [true, "Description is required."],
//   },
//   img: {
//     type: String,
//     default: "image.png",
//   },
//   categories: {
//     type: String,
//     enum: ["men", "women", "boys","girls"],
//     required: [true, "Category is required."],
//   },
//   size: {
//     type: [String],
//     required: [true, "size is required."],
//   },
//   availability: {
//     type: Number,
//     required: [true, "Availability is required."],
//   },
//   inStock: {
//     type: Boolean,
//     required: [true, "InStock is  required."],
//   },
//   price:{
//     type:Number,
//     required: [true, "Price is  required."],

//   }
// });

// const Product = model("Product", productSchema);

// module.exports = Product;
