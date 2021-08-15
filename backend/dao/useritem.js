var UserItemModel = require("../models/useritem");
var ItemModel = require("../models/item");
var FlashSaleModel = require("../models/flashsaleitems");

const limit = 15;

const userItemDao = {
  async getItemById(itemid) {
    return await ItemModel.findOne({ id: itemid });
  },

  async getItems(owner) {
    let data = await UserItemModel.find({
      owner: { $regex: `^${owner}$`, $options: "i" },
    });

    return data;
  },

  async getAllItems() {
    let data = await UserItemModel.find({ event: "airdrop" });
    return data;
  },
  async createItem(itemData, ownerAddress, JsonId) {
    //Add data to UserItems Collection
    let response = await UserItemModel.insertMany(itemData);
    if (itemData.event === "flashsale") {
      let response2 = await FlashSaleModel.findOneAndUpdate(
        { _id: JsonId },
        { $inc: { remaining_quantity: -1 } }
      );
    }

    return await UserItemModel.find({ owner: ownerAddress });
  },

  async updateItemOwner(itemId) {
    return await UserItemModel.findOneAndUpdate(
      { _id: itemId },
      { owner: process.env.OWNER_ADDRESS }
    );
    // return await UserItemModel.findOneAndUpdate({ _id: itemId }, { tokenId: 0 });
  },
  async updateData(tokenId) {
    return await UserItemModel.findOneAndUpdate(
      { tokenId: tokenId, event: "airdrop" },
      { itemId: 29 }
    );
  },

  async deleteItem() {
    // await UserItemModel.deleteMany({});
    // return await UserItemModel.find({});
    //After testing delete items
    // return await UserItemModel.remove({ _id: "610f0324b9d871537d932c08" });
    //return await UserItemModel.remove({ event: 'auction-reward' });
  },
};

module.exports = userItemDao;
