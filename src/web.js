import Web3 from "web3";
import getInfuraKey from "./actions/smartActions/helper";
import provider from "./provider";
import constants from "./utils/constants";

var web3;

let providerKey = getInfuraKey();

if (typeof window.web3 !== "undefined") {
  // Use Mist/MetaMask's provider.
  console.log("Use Mist/MetaMask's provider");
  web3 = new Web3(window.web3.currentProvider);
} else {
  if (provider.connected) {
    console.log("provider");
    web3 = new Web3(provider);
  } else {
    console.log("using infura provider");
    const infura =
      constants.net === 1
        ? `https://kovan.infura.io/v3/${providerKey}`
        : `https://bsc-dataseed.binance.org/`;
    web3 = new Web3(new Web3.providers.HttpProvider(infura));
  }
}
export default web3;
