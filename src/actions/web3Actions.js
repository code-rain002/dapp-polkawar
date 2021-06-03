import constants from './../utils/constants';

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
export const checkCorrectNetwork = () => {
  function execute() {
    if (typeof window.web3 !== 'undefined') {
      if (window.web3.currentProvider.networkVersion === constants.network_id) {
        //console.log('BSC');
        return true;
      } else {
        //console.log('Other Network');
        return false;
      }
    } else {
      if (typeof window.ethereum !== 'undefined') {
        if (window.ethereum.networkVersion === constants.network_id) {
          // console.log('BSC');
          return true;
        } else {
          //console.log('Other Network');
          return false;
        }
      } else {
        //console.log('eles');
        return false;
      }
    }
  }
  return setTimeout(() => {
    let response = execute();
    console.log('Response' + response);
    return response;
  }, 1000);
};
