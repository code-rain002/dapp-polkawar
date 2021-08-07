var mongoose = require("mongoose");

var FlashSaleModel = new mongoose.Schema({
  itemId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 3,
  },
  original_price: {
    type: String,
    required: true,
    default: 0,
  },
  sell_price: {
    type: String,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
    default: "BNB",
  },
  hashItem: {
    type: String,
    required: true,
  },
  hashImage: {
    type: String,
    required: true,
  },
  remaining_quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    default: "none",
  },
  properties: {
    type: Object,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
const FlashSale = mongoose.model("FlashSale", FlashSaleModel, "FlashSale");

module.exports = FlashSale;
