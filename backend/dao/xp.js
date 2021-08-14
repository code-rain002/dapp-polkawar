var XpModel = require("../models/xp");

const xpDao = {
  async getAllXp() {
    return await XpModel.find({});
  },

  async getXpById(owner) {
    return await XpModel.findOne({
      owner: { $regex: `^${owner}$`, $options: "i" },
    });
  },

  async updateXp(owner) {
    let xpDetails = await XpModel.findOne({ owner: owner });

    if (xpDetails) {
      //If records found update the object
      let newClaimNo = xpDetails.claimNo + 1;
      let newClaimTimestamp = [...xpDetails.claimTimestamp, Date.now()];
      let newLastClaim = Date.now();

      await XpModel.findOneAndUpdate(
        { owner: owner },
        {
          $set: {
            claimNo: newClaimNo,
            claimTimestamp: newClaimTimestamp,
            lastClaim: newLastClaim,
          },
        }
      );
    } else {
      //If records not found create a new object

      let newXp = {
        owner: owner,
        claimNo: 1,
        claimTimestamp: [Date.now()],
        lastClaim: Date.now(),
      };
      console.log(newXp);
      await XpModel.insertMany(newXp);
    }

    return await XpModel.find({});
  },

  async deleteXp() {
    await XpModel.deleteMany({});
    return await XpModel.find({});
  },
};

module.exports = xpDao;
