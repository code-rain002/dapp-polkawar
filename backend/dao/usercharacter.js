var UserCharacterModel = require("../models/usercharacter");

const userCharacterDao = {
  async getCharacterById(id) {
    return await UserCharacterModel.findOne({ _id: id });
  },

  async getCharacters(owner) {
    let data = await UserCharacterModel.find({ owner: owner });
    console.log(data);
    return data;
  },

  async getAllCharacters() {
    let data = await UserCharacterModel.find({});
    console.log(data);
    return data;
  },
  async createCharacter(characterData, userAddress) {
    let response = await UserCharacterModel.insertMany(characterData);
    return await UserCharacterModel.find({ owner: userAddress });
  },

  async deleteItem() {
    // await UserCharacterModel.deleteMany({});
    // return await UserCharacterModel.find({});
  },
};

module.exports = userCharacterDao;
