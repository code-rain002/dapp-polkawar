var XpModel = require("../models/xp");
var UserCharacterModel = require("../models/usercharacter");
var xpContract = require("./../contract/xpConnection");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http://45.77.91.38:9200/",
});

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

    let pwarCondition;
    let numberClaimCondition;
    let timeStampCondition;

    if (xpDetails === null) {
      pwarCondition = parseInt(txPwar) === 10;
      numberClaimCondition = parseInt(txnumberClaim) === 1;
      timeStampCondition = parseInt(txtimeStamp * 1000) + 300000 >= Date.now();
    } else {
      pwarCondition = parseInt(txPwar) === (xpDetails.claimNo + 1) * 10;
      numberClaimCondition = parseInt(txnumberClaim) === xpDetails.claimNo + 1;
      timeStampCondition = parseInt(txtimeStamp * 1000) + 300000 >= Date.now();
    }

    // Step 3: If All correct, update the database
    console.log(pwarCondition);
    console.log(numberClaimCondition);
    console.log(timeStampCondition);

    let xpResponse;
    let userCharacterResponse;
    let mongoError;

    if (pwarCondition && numberClaimCondition && timeStampCondition) {
      // Step 4: Update XP Details

      let increaseInXp;
      if (xpDetails) {
        //If records found :::: update the object
        increaseInXp = (xpDetails.claimNo + 1) * 10; // To update in user character properties

        xpResponse = await XpModel.findOneAndUpdate(
          { owner: owner },
          {
            $set: {
              claimNo: xpDetails.claimNo + 1,
              claimTimestamp: [...xpDetails.claimTimestamp, Date.now()],
              lastClaim: Date.now(),
            },
          },
          (err, doc) => {
            if (err) {
              console.log(err);
              return err;
            }
            if (doc) {
              console.log(doc);
              return doc;
            }
          }
        );
      } else {
        //If records not found create a new object
        increaseInXp = 10;
        let newXp = {
          owner: owner,
          claimNo: 1,
          claimTimestamp: [Date.now()],
          lastClaim: Date.now(),
        };
        xpResponse = await XpModel.insertMany(newXp);
      }

      //Logging if XPDetails response is null
      if (xpResponse === null || xpResponse === undefined) {
        let txdate = new Date().toISOString();
        await client.index({
          index: "polkawarlog",
          body: {
            owner: owner,
            time: txdate,
            status: "failed",
            source: "backend",
            transactionhash: blockNo,
            action: "claimxp",
            info: `b. XP Model update failed, values- increaseInXp: ${increaseInXp}.`,
          },
        });
      }

      // Step 5: Update User Character properties
      let characterData = await UserCharacterModel.findOne({
        owner: { $regex: `^${owner}$`, $options: "i" },
      });

      if (characterData) {
        //Getting character properties object
        let properties = characterData.properties;
        let level = parseInt(characterData.level);
        let levelwiseXp = ((level + 1) * (level + 1)) / 0.02;
        let updatedXp = parseInt(properties["xp"]) + parseInt(increaseInXp);

        console.log("updatedXp: " + updatedXp);
        console.log("levelwiseXp: " + levelwiseXp);

        // Checking XP values and updating UserCharacter Database
        if (updatedXp >= parseInt(levelwiseXp)) {
          let updatedLevel = level + 1;
          let newProp = {
            xp: updatedXp,
            hp: properties.hp + updatedLevel * 10,
            mp: properties.mp + updatedLevel * 7,
            Patk: Math.floor(properties.Patk + updatedLevel * 1.1),
            Pdef: Math.floor(properties.Pdef + updatedLevel * 1.1),
            speed: properties.speed + updatedLevel * 0.05,
            accuracy: properties.accuracy + updatedLevel * 1,
          };

          userCharacterResponse = await UserCharacterModel.findOneAndUpdate(
            { owner: owner },
            { properties: newProp, level: updatedLevel },
            (err, doc) => {
              if (err) {
                console.log(err);
                return err;
              }
              if (doc) {
                console.log(doc);
                return doc;
              }
            }
          );
        } else {
          properties["xp"] = updatedXp;
          userCharacterResponse = await UserCharacterModel.findOneAndUpdate(
            { owner: owner },
            { properties: properties },
            (err, doc) => {
              if (err) {
                console.log(err);
                return err;
              }
              if (doc) {
                console.log(doc);
                return doc;
              }
            }
          );
        }
        console.log("userCharacterResponse");
        console.log(userCharacterResponse);

        // If userCharacter Database update failed
        if (
          userCharacterResponse == null ||
          userCharacterResponse == undefined
        ) {
          let txdate = new Date().toISOString();
          await client.index({
            index: "polkawarlog",
            body: {
              owner: owner,
              time: txdate,
              status: "failed",
              source: "backend",
              transactionhash: blockNo,
              action: "claimxp",
              info: `d. UserCharacter Properties update in database failed. `,
            },
          });
        }
      } else {
        let txdate = new Date().toISOString();
        await client.index({
          index: "polkawarlog",
          body: {
            owner: owner,
            time: txdate,
            status: "failed",
            source: "backend",
            transactionhash: blockNo,
            action: "claimxp",
            info: `c. UserCharacter Collection found null for this owner.`,
          },
        });
      }
    } else {
      let txdate = new Date().toISOString();
      const esResult = await client.index({
        index: "polkawarlog",
        body: {
          owner: owner,
          time: txdate,
          status: "failed",
          source: "backend",
          transactionhash: blockNo,
          action: "claimxp",
          info: `a. Claim condition failed for Pwar:${pwarCondition}, claimNo:${numberClaimCondition}, timeStamp:${timeStampCondition}`,
        },
      });
      console.log(esResult);
    }
    return userCharacterResponse;
  },

  async deleteXp() {
    await XpModel.deleteMany({});
    return await XpModel.find({});
  },
};

module.exports = xpDao;
