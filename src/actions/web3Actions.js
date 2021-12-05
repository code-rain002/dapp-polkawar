import constants from "./../utils/constants";
import web3 from "./../web";
//Check wallet available
//Returns boolean true or false
export const checkWalletAvailable = () => {
  if (typeof window.ethereum !== "undefined") {
    //console.log('Yes available');

    if (window.ethereum) {
      //console.log('Yes metamask available');
      return true;
    } else {
      //console.log('No, Not available');
      return false;
    }
  } else {
    return false;
  }
};

//Check correct network
//Returns boolean true or false
export const checkCorrectNetwork = async () => {
  const account = await getUserAddress();

  let chainID;

  if (window.ethereum) {
    const id = await window.ethereum.networkVersion;

    if (id) {
      chainID = id;
    } else {
      chainID = await web3.eth.getChainId();
    }
  } else {
    chainID = await web3.eth.getChainId();
  }

  let networkId;
  if (constants.net === 0) {
    networkId = "56";
  } else {
    networkId = "97";
  }

  if (chainID === networkId) {
    //console.log('BSC');
    return true;
  } else {
    //console.log('Other Network');
    return false;
  }
};

//Get User Address from Web3
export const getUserAddress = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const accountAddress = accounts[0];

  return accountAddress;
};
