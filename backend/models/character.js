var mongoose = require("mongoose");

var CharacterModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: 0,
  },
  properties: {
    type: Object,
  },
  description: {
    type: String,
  },
  hashImage: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
const Character = mongoose.model("Character", CharacterModel, "Character");

module.exports = Character;
