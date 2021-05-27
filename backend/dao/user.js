const { request, json } = require('express');
const { RequestTimeout } = require('http-errors');
var UserModel = require('../models/user');

const limit = 15;

const userDao = {
  async getUserByAddress(address) {
    return await UserModel.findOne({ address });
  },

  async createUser(userData) {
    let userCount = await UserModel.find({ address: userData.address }).countDocuments();
    if (userCount === 0) {
      await UserModel.insertMany([userData]);
    }

    return await UserModel.findOne({ address: userData.address });
  },
  async updateUsername(userData) {
    console.log(userData.username);
    console.log(userData.address);

    return await UserModel.findOneAndUpdate({ address: userData.address }, { username: userData.username });

    // let userCount = await UserModel.find({ address: userData.address }).countDocuments();
    // if (userCount === 0) {
    //   await UserModel.findOneAndUpdate([userData]);
    // }

    // return await UserModel.findOne({ address: userData.address });
  },
};

module.exports = userDao;
