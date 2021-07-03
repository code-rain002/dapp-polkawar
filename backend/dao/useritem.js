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

  async createItem(itemData, ownerAddress) {
    await UserItemModel.insertMany(itemData);
    return await UserItemModel.find({ owner: ownerAddress });
  },

  async updateItemOwner(itemId) {
    return await UserItemModel.findOneAndUpdate(
      { _id: itemId },
      { owner: '0xFa2D318565C9cFC4CB666E271cE2598a4e85c08F' },
    );
  },

  async deleteItem() {
    await UserItemModel.deleteMany({});
    return await UserItemModel.find({});
  },
};

module.exports = userItemDao;
