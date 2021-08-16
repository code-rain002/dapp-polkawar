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
    var filter = { _user: { $regex: `^${owner}$`, $options: "i" } };
    var pastTransferEvents = await xpContract.getPastEvents("claimXPEvent", {
      filter,
      fromBlock: blockNo,
      toBlock: "latest",
    });
    let returnedValues = pastTransferEvents[0].returnValues;

    let txPwar = returnedValues._totalPWAR / 1000000000000000000;
    let txnumberClaim = returnedValues._numberClaim;
    let txtimeStamp = returnedValues._timeStamp;

    // Step 2: Verify all the conditions
    let xpDetails = await XpModel.findOne({
      owner: { $regex: `^${owner}$`, $options: "i" },
    });
    console.log(xpDetails);

    let pwarCondition;
    let numberClaimCondition;
    let timeStampCondition;

    if (xpDetails === null) {
      pwarCondition = parseInt(txPwar) === 10;
      numberClaimCondition = parseInt(txnumberClaim) === 1;
      timeStampCondition = parseInt(txtimeStamp * 1000) + 180000 >= Date.now();
    } else {
      pwarCondition = parseInt(txPwar) === (xpDetails.claimNo + 1) * 10;
      numberClaimCondition = parseInt(txnumberClaim) === xpDetails.claimNo + 1;
      timeStampCondition = parseInt(txtimeStamp * 1000) + 180000 >= Date.now();
    }

    // Step 3: If All correct, update the database
    console.log(pwarCondition);
    console.log(numberClaimCondition);
    console.log(timeStampCondition);
    if (pwarCondition && numberClaimCondition && timeStampCondition) {
      // Step 4: Update XP Details

      let increaseInXp;
      if (xpDetails) {
        //If records found :::: update the object

        let newClaimNo = xpDetails.claimNo + 1; // Increase claim no
        let newClaimTimestamp = [...xpDetails.claimTimestamp, Date.now()]; // add timestamp into claim array
        let newLastClaim = Date.now(); // add last timestamp to check 24 hours passed or not
        increaseInXp = newClaimNo * 10; // To update in user character properties

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
        increaseInXp = 10;
        console.log(newXp);
        await XpModel.insertMany(newXp);
      }
      // Step 5: Update User Character properties

      let characterData = await UserCharacterModel.findOne({
        owner: { $regex: `^${owner}$`, $options: "i" },
      });
      if (characterData) {
        let properties = characterData.properties;
        properties["xp"] = parseInt(properties["xp"]) + parseInt(10);
        console.log(properties);

        let response2 = await UserCharacterModel.findOneAndUpdate(
          { owner: owner },
          { properties: properties }
        );

        return response2;
      }
    }
  },

  async deleteXp() {
    await XpModel.deleteMany({});
    return await XpModel.find({});
  },
};

module.exports = xpDao;
