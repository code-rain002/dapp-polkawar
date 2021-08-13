var XpModel = require("../models/xp");

const xpDao = {
  async getAllXp() {
    return await XpModel.find({});
  },

  async updateXp(xpData) {
    await XpModel.insertMany(xpData);
    return await XpModel.find({});
  },

  async deleteXp() {
    await XpModel.deleteMany({});
    return await XpModel.find({});
  },
};

module.exports = xpDao;
