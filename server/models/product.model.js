const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: [2, "title must be at least 2 characters long"]
  },
  price: {
    type: Number,
    required: [true, "price is required"],
    min:[1,"price must have a value"]
  },
  description: {
    type: String,
    required: [true, "description is required"],
    minlength: [2, "title must be at least 2 characters long"]
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
