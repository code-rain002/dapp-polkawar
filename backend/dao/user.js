var logHelper = require("./../helper/logs");
var UserModel = require("../models/user");

const limit = 15;

const userDao = {
  async getUserByAddress(address) {
    return await UserModel.findOne({ address });
  },

  async createUser(userData) {
    let userCount = await UserModel.find({
      address: userData.address,
    }).countDocuments();
    if (userCount === 0) {
      await UserModel.insertMany([userData]);
    }

    return await UserModel.findOne({ address: userData.address });
  },

  async updateUsername(userData) {
    try {
      return await UserModel.findOneAndUpdate(
        { address: userData.address },
        { username: userData.username }
      );
    } catch (error) {
      //  writeLog(owner, status, source, transactionHash, action, info, data)
      logHelper.writeLog(
        userData.address,
        "failed",
        "backend",
        "No Need",
        "updateUsername",
        "fall in catch block of Dao.",
        error.message
      );
      return error.message;
    }
  },
};

module.exports = userDao;
