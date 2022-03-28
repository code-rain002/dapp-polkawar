const axios = require("axios");
const gameContract = require("../contract/gameContract");
const constants = require("../utils/constants");
const helperFn = require("./helper");
const logHelper = require("./logs");
const web3Connection = require("./web3Connection");
var Web3 = require("web3");

const characterHelper = {
  async mintCharacter(owner, characterObj) {
    var gas;
    var gasPrice;
    var nonce;
    var privateOwner;
    try {
      console.log("mint called");

      let privateKey = await helperFn.getKey();
      const account =
        web3Connection.eth.accounts.privateKeyToAccount(privateKey);

      privateOwner = account.address;

      // 1. Pinning the JSON
      let ipfs_url = `${constants.ipfs_url}/pinning/pinJSONToIPFS`;

      let body = {
        pinataMetadata: {
          name: `${owner}_${characterObj.name}_${characterObj.level}`,
        },
        pinataContent: characterObj,
      };
      let pinataRes;
      pinataRes = await axios
        .post(ipfs_url, body, {
          headers: {
            pinata_api_key: process.env.pinata_api_key,
            pinata_secret_api_key: process.env.pinata_api_secret,
          },
        })
        .then((res) => {
          return res.data;
        });
      pinataRes = undefined;
      if (pinataRes === undefined || pinataRes === null) {
        pinataRes = await axios
          .post(ipfs_url, body, {
            headers: {
              pinata_api_key: process.env.pinata_api_key,
              pinata_secret_api_key: process.env.pinata_api_secret,
            },
          })
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            logHelper.writeLog(
              owner,
              "failed",
              "backend",
              "",
              "claimxp",
              `e. Failed to pin json to Pinata Cloud.`,
              error.message
            );
          });
      }
      if (pinataRes !== undefined && pinataRes !== null) {
        // 2. Getting Hash of JSON
        let jsonHash = pinataRes.IpfsHash;
        console.log(jsonHash);

        // 3. Adding Keys to Wallet
        web3Connection.eth.accounts.wallet.add(privateKey);

        // 3. Creating a trasaction
        const tx = characterContract.methods.createItem(owner, jsonHash);
        gas = await tx.estimateGas({ from: privateOwner });
        gasPrice = 10000000000;
        const data = tx.encodeABI();
        nonce = await web3Connection.eth.getTransactionCount(privateOwner);

        // 4. Creating a trasaction Data
        const txData = {
          from: privateOwner,
          to: characterContract.options.address,
          data: data,
          gas,
          gasPrice,
          nonce,
        };

        // 5. Executing transaction

        const receipt = await web3Connection.eth.sendTransaction(txData);
      }
    } catch (err) {
      logHelper.writeLog(
        owner,
        "failed",
        "backend",
        "",
        "claimxp",
        `f. Minting of character failed.`,
        `${err.message} + (gas: ${gas} - gasPrice: ${gasPrice} - nonce: ${nonce} - privateOwner: ${privateOwner})`
      );
    }
  },

  async getLatestCharacterId(owner) {
    try {
      const length = await characterContract.methods.balanceOf(owner).call();
      const tokenId = await characterContract.methods
        .tokenOfOwnerByIndex(owner, length - 1)
        .call();
      console.log(tokenId);
      return tokenId;
    } catch (error) {
      //  writeLog(owner, status, source, transactionHash, action, info, data)

      return 0;
    }
  },

  // update game result
  async updateStatus(poolId, address, drawStatus) {
    let rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
    var provider = rpcUrl;
    var web3Provider = new Web3.providers.HttpProvider(provider);
    var web3Test = new Web3(web3Provider);

    var gas;
    var gasPrice;
    var nonce;
    var privateOwner;
    try {
      let privateKey = await helperFn.getKeyTest();
      const account = web3Test.eth.accounts.privateKeyToAccount(privateKey);

      privateOwner = account.address;

      // 3. Adding Keys to Wallet
      web3Test.eth.accounts.wallet.add(privateKey);

      // 3. Creating a trasaction
      console.log(address);
      console.log(drawStatus);
      // const tx = gameContract.methods.addPool(5000000);
      const tx = gameContract.methods.updateGameStatus(
        poolId,
        address,
        drawStatus
      );
      console.log("privateOwner:" + privateOwner);

      gas = await tx.estimateGas({ from: privateOwner });
      gasPrice = 10000000000;
      const data = tx.encodeABI();
      tempNonce = await web3Test.eth.getTransactionCount(privateOwner);
      nonce = tempNonce;

      // 4. Creating a trasaction Data
      console.log("privateOwner:" + privateOwner);
      const txData = {
        from: privateOwner,
        to: gameContract.options.address,
        data: data,
        gas: 90000,
        gasPrice,
        nonce,
      };

      // 5. Executing transaction

      const receipt = await web3Test.eth.sendTransaction(txData);

      if (receipt) {
        return "success";
      } else {
        return "failed";
      }
    } catch (err) {
      console.log(err);

      // logHelper.writeLog(
      //   address,
      //   "failed",
      //   "backend",
      //   "",
      //   "claimAward",
      //   `f. claim award from game failed.`,
      //   `${err.message} + (gas: ${gas} - gasPrice: ${gasPrice} - nonce: ${nonce} - privateOwner: ${privateOwner})`
      // );
      let errorData = {
        stat: 400,
        message: err.message,
      };
      return errorData;
    }
  },
};

module.exports = characterHelper;
