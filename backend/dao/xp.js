var XpModel = require("../models/xp");
var UserCharacterModel = require("../models/usercharacter");
var xpContract = require("./../contract/xpConnection");
var logHelper = require("../helper/logs");
const constants = require("../utils/constants");
const characterHelper = require("../helper/characterHelper");
const web3Connection = require("./../helper/web3Connection");
const helperFn = require("../helper/helper");

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
    try {
      // Step 1: Get pastEvent details

      let returnedValues;

      let totalCallsRemaining = 10;

      let result = null;
      const getPastEventValues = async () => {
        totalCallsRemaining = totalCallsRemaining - 1;
        let callEventFunction = async () => {
          var filter = { _user: { $regex: `^${owner}$`, $options: "i" } };

          let pastTransferEvents = await xpContract.getPastEvents(
            "claimXPEvent",
            {
              filter,
              fromBlock: blockNo,
              toBlock: "latest",
            }
          );
          return pastTransferEvents[0];
        };
        result = await callEventFunction();

        if (result !== null && result !== undefined) {
          return result;
        } else {
          if (totalCallsRemaining > 0) {
            return await getPastEventValues();
          } else {
            return result;
          }
        }
      };

      let eventData = await getPastEventValues();
      returnedValues = eventData.returnValues;

      let txPwar = returnedValues._totalPWAR / 1000000000000000000;
      let txnumberClaim = returnedValues._numberClaim;
      let txtimeStamp = returnedValues._timeStamp;

      let requestPWAR;
      let requestClaim;
      // Step 2: Verify all the conditions
      let xpDetails = await XpModel.findOne({
        owner: { $regex: `^${owner}$`, $options: "i" },
      });

      let pwarCondition;
      let numberClaimCondition;
      let timeStampCondition;

      if (xpDetails === null) {
        requestPWAR = 10;
        requestClaim = 1;
        pwarCondition = parseInt(txPwar) === 10;
        numberClaimCondition = parseInt(txnumberClaim) === 1;
        timeStampCondition =
          parseInt(txtimeStamp * 1000) + 600000 >= Date.now();
      } else {
        requestPWAR = (xpDetails.claimNo + 1) * 10;
        requestClaim = xpDetails.claimNo + 1;
        pwarCondition = parseInt(txPwar) === (xpDetails.claimNo + 1) * 10;
        numberClaimCondition =
          parseInt(txnumberClaim) === xpDetails.claimNo + 1;
        timeStampCondition =
          parseInt(txtimeStamp * 1000) + 600000 >= Date.now();
      }

      // Step 3: If All correct, update the database
      console.log(pwarCondition);
      console.log(numberClaimCondition);
      console.log(timeStampCondition);

      let xpResponse;
      let userCharacterResponse;

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
                return err;
              }
              if (doc) {
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

        //Logging if XPDetails response is null from database
        if (xpResponse === null || xpResponse === undefined) {
          //  writeLog(owner, status, source, transactionHash, action, info, data)
          logHelper.writeLog(
            owner,
            "failed",
            "backend",
            blockNo,
            "claimxp",
            `b. XP Model update failed, values- increaseInXp: ${increaseInXp}.`
          );
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

            let newCharacterObj = {
              level: level + 1,
              properties: {
                xp: updatedXp,
                hp: properties.hp + updatedLevel * 10,
                mp: properties.mp + updatedLevel * 7,
                Patk: Math.floor(properties.Patk + updatedLevel * 1.1),
                Pdef: Math.floor(properties.Pdef + updatedLevel * 1.1),
                speed: properties.speed + updatedLevel * 0.05,
                accuracy: properties.accuracy + updatedLevel * 1,
              },

              name: characterData.name,
              username: characterData.username,
              image: characterData.hashImage,
              description: characterData.description,
              upgradeDate: new Date().toISOString(),
            };

            await characterHelper.mintCharacter(owner, newCharacterObj);

            let newTokenId = await characterHelper.getLatestCharacterId(owner);

            userCharacterResponse = await UserCharacterModel.findOneAndUpdate(
              { owner: { $regex: `^${owner}$`, $options: "i" } },
              {
                properties: newProp,
                level: updatedLevel,
                tokenId: newTokenId,
              },
              (err, doc) => {
                if (err) {
                  return err;
                }
                if (doc) {
                  return doc;
                }
              }
            );
          } else {
            properties["xp"] = updatedXp;
            userCharacterResponse = await UserCharacterModel.findOneAndUpdate(
              { owner: { $regex: `^${owner}$`, $options: "i" } },
              { properties: properties },
              (err, doc) => {
                if (err) {
                  return err;
                }
                if (doc) {
                  return doc;
                }
              }
            );
          }

          // If userCharacter Database update failed
          if (
            userCharacterResponse == null ||
            userCharacterResponse == undefined
          ) {
            //  writeLog(owner, status, source, transactionHash, action, info, data)
            logHelper.writeLog(
              owner,
              "failed",
              "backend",
              blockNo,
              "claimxp",
              `d. UserCharacter Properties update in database failed.`
            );
          }
        } else {
          //  writeLog(owner, status, source, transactionHash, action, info, data)
          logHelper.writeLog(
            owner,
            "failed",
            "backend",
            blockNo,
            "claimxp",
            `c. UserCharacter Collection found null for this owner.`
          );
        }
      } else {
        //  writeLog(owner, status, source, transactionHash, action, info, data)
        logHelper.writeLog(
          owner,
          "failed",
          "backend",
          blockNo,
          "claimxp",
          `a. ExpectedPWAR:${txPwar} - requestPWAR:${requestPWAR}, ExpectedClaimNo:${txnumberClaim} - requestClaimNo:${requestClaim}, timeStamp Cond: ${timeStampCondition}`
        );
      }
      return userCharacterResponse;
    } catch (error) {
      //  writeLog(owner, status, source, transactionHash, action, info, data)
      logHelper.writeLog(
        owner,
        "failed",
        "backend",
        blockNo,
        "claimxp",
        `Fall in catch block of updateXp Dao`,
        error.message
      );
    }
    return 0;
  },

  async deleteXp() {
    // let newCharacterObj = {
    //   level: 1,
    //   properties: {
    //     xp: 30,
    //     hp: 40,
    //     mp: 12,
    //     Patk: 12,
    //     Pdef: 12,
    //     speed: 1,
    //     accuracy: 5,
    //   },
    //   name: "Archer",
    //   username: "Tahir Ahmad",
    //   image: "QmchE9x6ggMAZPyZZ49Q2QKJ3bcAHNnSSHtooR7s3ZWmtE",
    //   description:
    //     "The archer is the character with fast attack speed and angelic beauty.",
    //   upgradeDate: new Date().toISOString(),
    // };
    // let data = await characterHelper.mintCharacter(
    //   "0x9d7117a07fca9f22911d379a9fd5118a5fa4f448",
    //   newCharacterObj
    // );
  },
};

module.exports = xpDao;
