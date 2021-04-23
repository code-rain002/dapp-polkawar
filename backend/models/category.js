var mongoose = require('mongoose');

var UserModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    required: true,
  },
});
const Category = mongoose.model('Category', UserModel, 'Category');

module.exports = Category;
