import constants from './../utils/constants';

//Check wallet available
//Returns boolean true or false
export const checkWalletAvailable = () => {
  if (window.ethereum) {
    console.log('Yes available');

    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('Yes metamask available');
      return true;
    } else {
      console.log('No, Not available');
      return false;
    }
  }
};

//Check correct network
//Returns boolean true or false
export const checkCorrectNetwork = () => {
  const walletAvailable = checkWalletAvailable;
  if (walletAvailable) {
    if (window.ethereum.networkVersion === constants.network_id) {
      console.log('BSC');

      return true;
    } else {
      console.log('Other Network');

      return false;
    }
  }
};
