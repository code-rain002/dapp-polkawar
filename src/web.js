import Web3 from 'web3';
import Fortmatic from 'fortmatic';

// var web3Latest;
// const BSCOptions = {
//   /* Smart Chain mainnet RPC URL */
//   rpcUrl: 'https://bsc-dataseed.binance.org/',
//   chainId: 56, // Smart Chain mainnet chain id
// };

// // Setting network to Smart Chain
// const fm = new Fortmatic('6f0ba6da417340e6b1511be0f2bc389b', BSCOptions);
// window.web3 = new Web3(fm.getProvider());
// web3Latest = window.web3;

var web3;
if (typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = undefined;
}
export default web3;
