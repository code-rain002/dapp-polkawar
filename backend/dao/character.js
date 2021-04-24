const { request, json } = require('express');
const { RequestTimeout } = require('http-errors');
var CharacterModel = require('../models/character');

const limit = 15;

const characterDao = {
  async getCharacterById() {
    return await CharacterModel.find({ _id });
  },

  async getCharacters() {
    return await CharacterModel.find({});
  },

  async createCharacter(characterData) {
    console.log(characterData);

    let characterCount = await CharacterModel.find({ name: characterData.name }).countDocuments();
    if (characterCount === 0) {
      CharacterModel.insertMany([characterData]);
    }
    console.log(characterCount);
    return await CharacterModel.findOne({ name: characterData.name });
  },
};

module.exports = characterDao;
