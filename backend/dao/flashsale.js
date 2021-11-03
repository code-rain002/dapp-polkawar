const { request, json } = require("express");
const { RequestTimeout } = require("http-errors");
var FlashSaleModel = require("../models/flashsaleitems");
var ItemsModel = require("../models/item");

const limit = 15;

const flashsaleDao = {
  async getItemById(id) {
    return await FlashSaleModel.findOne({ _id: id });
  },

  async getItems(category) {
    return await FlashSaleModel.find({});
  },

  async getItemRemainingSlot(itemId) {
    let data = await FlashSaleModel.findOne({ itemId: itemId });
    let slots = data["remaining_quantity"];
    return slots;
  },

  async getListItems(pageIndex, pageSize) {
    let skipped = pageIndex * pageSize;
    return await FlashSaleModel.find({}).skip(skipped).limit(pageSize);
  },

  async createItem(itemData, originalPrice, sellPrice, saleQuantity) {
    let allItems = await ItemsModel.find({ id: { $in: itemData } });

    let flashSaleItems = allItems.map((singleItem) => {
      let tempObj = {
        itemId: singleItem.id,
        name: singleItem.name,
        level: singleItem.level,
        original_price: originalPrice,
        sell_price: sellPrice,
        remaining_quantity: saleQuantity,
        currency: "BNB",
        description: singleItem.description,
        category: singleItem.category,
        properties: singleItem.properties,
        hashImage: singleItem.hashImage,
        hashItem: singleItem.hashItem,
      };
      return tempObj;
    });

    await FlashSaleModel.insertMany(flashSaleItems);

    return await FlashSaleModel.find({});
  },

  async deleteItem() {
    await FlashSaleModel.deleteMany({});
    return await FlashSaleModel.find({});
  },
};

module.exports = flashsaleDao;
