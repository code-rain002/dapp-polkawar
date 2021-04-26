const { request, json } = require('express');
const { RequestTimeout } = require('http-errors');
var ItemModel = require('../models/item');

const limit = 15;

const itemDao = {
  async getItemById(id) {
    console.log(id);
    return await ItemModel.findOne({ id });
  },

  async getItems(category) {
    console.log('category ' + category);
    return await ItemModel.find({});
  },

  async getCategories() {
    return await ItemModel.distinct('category');
  },
  async createItem(itemData) {
    console.log(itemData);

    let itemCount = await ItemModel.find({ name: itemData.name }).countDocuments();
    if (itemCount === 0) {
      ItemModel.insertMany([itemData]);
    }
    console.log('Count' + itemCount);
    console.log(itemData);

    return await ItemModel.findOne({ name: itemData.name });
  },
};

module.exports = itemDao;
