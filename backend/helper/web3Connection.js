var Web3 = require("web3");
var constants = require("./../utils/constants");

let rpcUrl =
  constants.net === 0
    ? "https://bsc-dataseed.binance.org/"
    : "https://data-seed-prebsc-1-s1.binance.org:8545/";
var provider = rpcUrl;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3Connection = new Web3(web3Provider);

module.exports = web3Connection;
