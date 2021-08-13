var UserCharacterModel = require("../models/usercharacter");
var CharacterModel = require("../models/character");

const userCharacterDao = {
  async getCharacterById(id) {
    return await UserCharacterModel.findOne({ _id: id });
  },

  async getTopCharacters() {
    return await UserCharacterModel.find({})
      .sort({ level: 1 })
      .sort({ createdDate: 1 })
      .limit(5);
  },

  async getUserCharacter(owner) {
    let data = await UserCharacterModel.findOne({ owner: owner });
    return data;
  },

  async getAllCharacters() {
    let data = await UserCharacterModel.find({});
    return data;
  },
  async createCharacter(characterInfo) {
    let characterData = {
      tokenId: characterInfo.tokenId,
      properties: characterInfo.properties,
      name: characterInfo.name,
      username: characterInfo.username,
      owner: characterInfo.owner,
      hashImage: characterInfo.hashImage,
      level: characterInfo.level,
      description: characterInfo.description,
    };
    await UserCharacterModel.insertMany(characterData);
    return await UserCharacterModel.find({ owner: characterInfo.owner });
  },

  async deleteItem(owner) {
    return await UserCharacterModel.deleteMany({ owner: owner });
  },
};

module.exports = userCharacterDao;
