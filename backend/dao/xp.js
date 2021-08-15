var XpModel = require("../models/xp");
var UserCharacterModel = require("../models/usercharacter");
var xpContract = require("./../contract/xpConnection");

const xpDao = {
  async getAllXp() {
    return await XpModel.find({});
  },

  async getXpById(owner) {
    return await XpModel.findOne({
      owner: { $regex: `^${owner}$`, $options: "i" },
    });
  },

  async updateXp(owner, blockNo) {
    // Step 1: Get pastEvent details
    var filter = { _user: "0x693732204104A6e0e636844C85e021d25306A6Cc" };
    var pastTransferEvents = contractInstance.getPastEvents("claimXPEvent", {
      filter,
      fromBlock: 190,
      toBlock: "latest",
    });

    console.log(pastTransferEvents);

    // Step 2: Verify all the conditions

    // Step 3: If All correct, update the database

    // Step 4: Update XP Details
    // let xpDetails = await XpModel.findOne({ owner: owner });

    //let increaseInXp;
    // if (xpDetails) {
    //   //If records found update the object
    //   let newClaimNo = xpDetails.claimNo + 1; // Increase claim no
    //   let newClaimTimestamp = [...xpDetails.claimTimestamp, Date.now()]; // add timestamp into claim array
    //   let newLastClaim = Date.now(); // add last timestamp to check 24 hours passed or not
    //   increaseInXp = newClaimNo * 10;
    //   await XpModel.findOneAndUpdate(
    //     { owner: owner },
    //     {
    //       $set: {
    //         claimNo: newClaimNo,
    //         claimTimestamp: newClaimTimestamp,
    //         lastClaim: newLastClaim,
    //       },
    //     }
    //   );
    // } else {
    //   //If records not found create a new object
    //   let newXp = {
    //     owner: owner,
    //     claimNo: 1,
    //     claimTimestamp: [Date.now()],
    //     lastClaim: Date.now(),
    //   };
    //   increaseInXp = 10;

    //   console.log(newXp);
    //   await XpModel.insertMany(newXp);
    // }

    // Step 5: Update User Character properties

    // // WIP: Complete this feature to update properties
    // let characterData = await UserCharacterModel.findOne({ owner: owner });
    // let properties = characterData.properties;
    // properties["xp"] = parseInt(properties["xp"])+ parseInt(increaseInXp);

    // let response2 = await UserCharacterModel.findOneAndUpdate(
    //   { owner: owner },
    //   { properties: properties }
    // );

    // return response2;
  },

  async deleteXp() {
    await XpModel.deleteMany({});
    return await XpModel.find({});
  },
};

module.exports = xpDao;
