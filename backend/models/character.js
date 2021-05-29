var mongoose = require('mongoose');

var CharacterModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
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
  properties: {
    type: Object,
    default: {
      hp: 30,
      mp: 21,
      pAtk: 6,
      mAtk: 0,
      pDef: 7,
      mDef: 7,
      spd: 0.7,
    },
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
const Character = mongoose.model('Character', CharacterModel, 'Character');

module.exports = Character;
