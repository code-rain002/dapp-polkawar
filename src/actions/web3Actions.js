import constants from './../utils/constants';
import web3 from './../web';
//Check wallet available
//Returns boolean true or false
export const checkWalletAvailable = () => {
  if (typeof window.ethereum !== 'undefined') {
    //console.log('Yes available');

    if (window.ethereum && window.ethereum.isMetaMask) {
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
  let chainID = await web3.eth.getChainId().then((res) => {
    return res;
  });
  //console.log(chainID);
  if (chainID === 56) {
    //console.log('BSC');
    return true;
  } else {
    //console.log('Other Network');
    return false;
  }
};
