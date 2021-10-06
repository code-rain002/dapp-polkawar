import Web3 from "web3";

import provider from "./provider";
import constants from "./utils/constants";

var web3;

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

  }
}
export default web3;
