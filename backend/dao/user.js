const { request, json } = require('express');
const { RequestTimeout } = require('http-errors');
var UserModel = require('../models/user');

const limit = 15;

const userDao = {
  async getUserByAddress(address) {
    console.log(address);
    return await UserModel.findOne({ address });
  },

  async createUser(userData) {
    console.log(userData);

    let userCount = await UserModel.find({ address: userData.address }).countDocuments();
    if (userCount === 0) {
      UserModel.insertMany([userData, userData]);
    }

    return await UserModel.findOne({ address: userData.address });
  },
};

module.exports = userDao;
