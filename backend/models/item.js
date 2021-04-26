var mongoose = require('mongoose');

var ItemModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: 'none',
  },
  description: {
    type: String,
  },
  tradeHistory: {
    type: Array,
  },
  gallery: {
    type: Array,
  },
  owner: {
    type: Array,
  },
  upgradeHistory: {
    type: Array,
  },
  level: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
    default: 'ETH',
  },

  isActived: {
    type: Number,
    required: true,
    default: 0,
  },
  isDeleted: {
    type: Number,
    required: true,
    default: 0,
  },
});
const Item = mongoose.model('Item', ItemModel, 'Item');

module.exports = Item;
