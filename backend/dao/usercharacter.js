var UserCharacterModel = require("../models/usercharacter");
var CharacterModel = require("../models/character");

const userCharacterDao = {
  async getCharacterById(id) {
    return await UserCharacterModel.findOne({ _id: id });
  },

  async getUserCharacters(owner) {
    let data = await UserCharacterModel.find({ owner: owner });
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
