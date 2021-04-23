var mongoose = require('mongoose');

var UserModel = new mongoose.Schema({
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
    default: new Date(),
  },
});
const Category = mongoose.model('Category', UserModel, 'Category');

module.exports = Category;
