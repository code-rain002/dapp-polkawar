var UserItemModel = require('../models/useritem');

const limit = 15;

const userItemDao = {
  async getItemById(id) {
    return await UserItemModel.findOne({ _id: id });
  },

  async getItems(owner) {
    let data = await UserItemModel.find({ owner: owner });
    console.log(data);
    return data;
  },

  async createItem(itemData) {
    await UserItemModel.insertMany(itemData);
    return await UserItemModel.find({});
  },

  async deleteItem() {
    await UserItemModel.deleteMany({});
    return await UserItemModel.find({});
  },
};

module.exports = userItemDao;
