var mongoose = require('mongoose');

var UserItemModel = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
  },
  tokenType: {
    type: Number,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  buyDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
const UserItem = mongoose.model('UserItem', UserItemModel, 'UserItem');

module.exports = UserItem;
