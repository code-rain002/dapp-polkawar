var mongoose = require('mongoose');

var UserModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  characters: {
    type: Array,
  },
  onSale: {
    type: Array,
  },
  equipments: {
    type: Array,
  },
  battles: {
    type: Array,
  },
  activity: {
    type: Array,
  },

  createdDate: {
    type: Date,
    required: true,
  },
});
const User = mongoose.model('User', UserModel, 'User');

module.exports = User;
