var mongoose = require('mongoose');

var CharacterModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  level: {
    type: String,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
const Character = mongoose.model('Character', CharacterModel, 'Character');

module.exports = Character;
