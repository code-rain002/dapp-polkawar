const { request, json } = require("express");
const { RequestTimeout } = require("http-errors");
var CharacterModel = require("../models/character");

const limit = 15;

const characterDao = {
  async getCharacterById() {
    return await CharacterModel.find({ id });
  },

  async getCharacters() {
    return await CharacterModel.find({});
  },

  async createCharacters(characterData) {
    await CharacterModel.insertMany(characterData);
    return await CharacterModel.find({});
  },

  async deleteCharacter() {
    await CharacterModel.deleteMany({});
    return await CharacterModel.find({});
  },
};

module.exports = characterDao;
