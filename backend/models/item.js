var mongoose = require("mongoose");

var ItemModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Number,
    required: true
  },
  description: {
    type: String
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
    required: true
  },
  avartar: {
    type: String
  },
  createdDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
  },
  currency: {
    type: String
  },
  class: {
    type: String
  },
  isActived: {
    type: Number,
    required: true
  },
  isDeleted: {
    type: Number,
    required: true
  }

});
const Item = mongoose.model("Item", ItemModel, "Item");

module.exports = Item;
