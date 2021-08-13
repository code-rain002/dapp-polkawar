var mongoose = require("mongoose");

var XpModel = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },

  claimNo: {
    type: Number,
    required: true,
    default: 0,
  },
  claimTimestamp: {
    type: Array,
    required: true,
    default: [],
  },
  lastClaim: {
    type: String,
    required: true,
  },
});

const XP = mongoose.model("XP", XpModel, "XP");

module.exports = XP;
