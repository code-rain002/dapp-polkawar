var mongoose = require("mongoose");

var ItemModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
    default: "none",
  },
  level: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
    default: "PWAR",
  },
  properties: {
    type: Object,
    required: false,
  },
  hashItem: {
    type: String,
    required: false,
  },
  hashImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  gallery: {
    type: Array,
  },
  forCharacter: {
    type: String,
    required: true,
  },
  owner: {
    type: Array,
    required: false,
  },

  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
const Item = mongoose.model("Item", ItemModel, "Item");

module.exports = Item;
