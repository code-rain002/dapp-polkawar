const axios = require("axios");
const characterContract = require("../contract/characterConnection");
const constants = require("../utils/constants");
const helperFn = require("./helper");
const logHelper = require("./logs");
const web3Connection = require("./web3Connection");

const characterHelper = {
  async mintCharacter(owner, characterObj) {
    var gas;
    var gasPrice;
    var nonce;
    try {
      console.log("mint called");

      let privateKey = await helperFn.getKey();
      const account =
        web3Connection.eth.accounts.privateKeyToAccount(privateKey);

      let privateOwner = account.address;

      // 1. Pinning the JSON
      let ipfs_url = `${constants.ipfs_url}/pinning/pinJSONToIPFS`;

      let body = {
        pinataMetadata: {
          name: `${owner}_${characterObj.name}_${characterObj.level}`,
        },
        pinataContent: characterObj,
      };

      let pinataRes = await axios
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
};

module.exports = characterHelper;
