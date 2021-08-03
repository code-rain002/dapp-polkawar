var mongoose = require("mongoose");

var UserCharacterModel = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
  },
  properties: {
    type: Object,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },

  owner: {
    type: String,
    required: true,
  },

  level: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
const UserCharacter = mongoose.model(
  "UserCharacter",
  UserCharacterModel,
  "UserCharacter"
);

module.exports = UserCharacter;
