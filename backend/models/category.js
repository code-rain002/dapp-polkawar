var mongoose = require('mongoose');

var CategoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
const Category = mongoose.model('Category', CategoryModel, 'Category');

module.exports = Category;
