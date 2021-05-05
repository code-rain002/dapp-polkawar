import Web3 from 'web3';

var web3;
if (typeof window.web3 !== 'undefined') {
  // Use Mist/MetaMask's provider.
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = undefined;
}
export default web3;
