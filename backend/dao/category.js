const { request, json } = require('express');
const { RequestTimeout } = require('http-errors');
var CategoryModel = require('../models/category');

const limit = 15;

const categoryDao = {
  async getCategories() {
    return await CategoryModel.find({});
  },

  async createCategory(categoryData) {
    await CategoryModel.insertMany(categoryData);
    return await CategoryModel.find({});
  },

  async deleteCategory() {
    await CategoryModel.deleteMany({});
    return await CategoryModel.find({});
  },
};

module.exports = categoryDao;
