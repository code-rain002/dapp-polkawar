var mongoose = require('mongoose');

var UserModel = new mongoose.Schema({
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
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    required: true,
  },
});
const Character = mongoose.model('Character', UserModel, 'Character');

module.exports = Character;
