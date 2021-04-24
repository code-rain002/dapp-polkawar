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
    console.log(category);
    return await ItemModel.find({});
  },
};

module.exports = itemDao;
