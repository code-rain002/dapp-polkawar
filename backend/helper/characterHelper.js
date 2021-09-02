const axios = require("axios");
const characterContract = require("../contract/characterConnection");
const constants = require("../utils/constants");
const helperFn = require("./helper");
const web3Connection = require("./web3Connection");

const characterHelper = {
  async mintCharacter(owner, characterObj) {
    try {
      console.log("mint called");
      let privateOwner = "0x3c41896C906a2DC4e28CFBD12d3f78454D510B6E";

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
          console.log(error);
        });

      // 2. Getting Hash of JSON
      let jsonHash = pinataRes.IpfsHash;
      console.log(jsonHash);

      // 3. Adding Keys to Wallet
      let privateKey = await helperFn.getKey();
      web3Connection.eth.accounts.wallet.add(privateKey);

      // 3. Creating a trasaction
      const tx = characterContract.methods.createItem(owner, jsonHash);
      const gas = await tx.estimateGas({ from: privateOwner });
      const gasPrice = 10000000000;
      const data = tx.encodeABI();
      const nonce = await web3Connection.eth.getTransactionCount(privateOwner);

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

      return receipt;
    } catch (err) {
      return err;
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
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = characterHelper;
