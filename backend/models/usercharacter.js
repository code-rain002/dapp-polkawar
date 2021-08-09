var mongoose = require("mongoose");
const { string } = require("prop-types");

var UserCharacterModel = new mongoose.Schema({
  tokenId: {
    type: String,
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
  username: {
    type: String,
    required: false,
  },
  owner: {
    type: String,
    required: true,
  },
  hashImage: {
    type: String,
    required: true,
  },
  level: {
    type: String,
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
