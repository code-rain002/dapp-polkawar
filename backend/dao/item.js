const { request, json } = require('express');
const { RequestTimeout } = require('http-errors');
var ItemModel = require('../models/item');

const limit = 15;

const itemDao = {
  async getItemById(id) {
    return await ItemModel.findOne({ _id: id });
  },

  async getItems(category) {
    if (category === 'All') {
      return await ItemModel.find({});
    } else {
      return await ItemModel.find({ category: category });
    }
  },

  async getListItems(pageIndex, pageSize) {
    let skipped = pageIndex * pageSize;
    return await ItemModel.find({}).skip(skipped).limit(pageSize);
  },

  async createItem(itemData) {
    await ItemModel.insertMany(itemData);
    return await ItemModel.find({});
  },

  async deleteItem() {
    await ItemModel.deleteMany({});
    return await ItemModel.find({});
  },
};

module.exports = itemDao;
