const { request, json } = require('express');
const { RequestTimeout } = require('http-errors');
var CategoryModel = require('../models/category');

const limit = 15;

const categoryDao = {
  async getCategories() {
    return await CategoryModel.find({});
  },

  async createCategory(categoryData) {
    console.log(categoryData);

    let categoryCount = await CategoryModel.find({ name: categoryData.name }).countDocuments();
    if (categoryCount === 0) {
      CategoryModel.insertMany([categoryData]);
    }
    console.log(categoryCount);
    return await CategoryModel.findOne({ name: categoryData.name });
  },
};

module.exports = categoryDao;
