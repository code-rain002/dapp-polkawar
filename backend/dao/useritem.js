var UserItemModel = require('../models/useritem');
var FlashSaleModel = require('../models/flashsaleitems');


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

  async createItem(itemData, ownerAddress, JsonId) {
    let response = await UserItemModel.insertMany(itemData);

    let response2 = await FlashSaleModel.findOneAndUpdate(
      { _id: JsonId },
      { $inc: { remaining_quantity: - 1 } }
    );
    return await UserItemModel.find({ owner: ownerAddress });
  },

  async updateItemOwner(itemId) {
    return await UserItemModel.findOneAndUpdate(
      { _id: itemId },
      { owner: process.env.OWNER_ADDRESS },
    );
  },

  async deleteItem() {
    await UserItemModel.deleteMany({});
    return await UserItemModel.find({});
  },
};

module.exports = userItemDao;
