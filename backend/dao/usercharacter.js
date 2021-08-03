var UserCharacterModel = require("../models/usercharacter");
var CharacterModel = require("../models/character");

const userCharacterDao = {
  async getCharacterById(id) {
    return await UserCharacterModel.findOne({ _id: id });
  },

  async getUserCharacters(owner) {
    let data = await UserCharacterModel.find({ owner: owner });
    console.log(data);
    return data;
  },

  async getAllCharacters() {
    let data = await UserCharacterModel.find({});
    console.log(data);
    return data;
  },
  async createCharacter(contractTokenId, characterId, owner, username) {
    let characterFromDB = await CharacterModel.findOne({ id: characterId });

    let characterData = {
      tokenId: contractTokenId,
      properties: characterFromDB.properties,
      name: characterFromDB.name,
      username: username,
      owner: owner,
      level: characterFromDB.level,
      description: characterFromDB.description,
    };

    console.log(characterData);
    await UserCharacterModel.insertMany(characterData);
    return await UserCharacterModel.find({ owner: owner });
  },

  async deleteItem() {
    // await UserCharacterModel.deleteMany({});
    // return await UserCharacterModel.find({});
  },
};

module.exports = userCharacterDao;
