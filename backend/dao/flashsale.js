const { request, json } = require('express');
const { RequestTimeout } = require('http-errors');
var FlashSaleModel = require('../models/flashsaleitems');

const limit = 15;

const flashsaleDao = {
  async getItemById(id) {
    return await FlashSaleModel.findOne({ _id: id });
  },

  async getItems(category) {
    return await FlashSaleModel.find({});
  },

  async getListItems(pageIndex, pageSize) {
    let skipped = pageIndex * pageSize;
    return await FlashSaleModel.find({}).skip(skipped).limit(pageSize);
  },

  async createItem(itemData) {
    await FlashSaleModel.insertMany(itemData);

    return await FlashSaleModel.find({});
  },

  async deleteItem() {
    await FlashSaleModel.deleteMany({});
    return await FlashSaleModel.find({});
  },
};

module.exports = flashsaleDao;
