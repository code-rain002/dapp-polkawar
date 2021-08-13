var mongoose = require("mongoose");

var XpModel = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },

  claimNo: {
    type: String,
    required: true,
    default: 0,
  },
  claimTimestamp: {
    type: Array,
    required: true,
    default: [],
  },
  LastClaim: {
    type: String,
    required: true,
    default: new Date(),
  },
});

const XP = mongoose.model("XP", XpModel, "XP");

module.exports = XP;
