import Web3 from 'web3';
import provider from './provider';

var web3;

if (typeof window.web3 !== 'undefined') {
  // Use Mist/MetaMask's provider.
  console.log('using native web3 provider ');
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.log('using infura web3 provider');

  if (provider.connected) {
    web3 = new Web3(provider);
  } else {
    const infura = `https://mainnet.infura.io/v3/6f0ba6da417340e6b1511be0f2bc389b`;
    web3 = new Web3(new Web3.providers.HttpProvider(infura));
  }
}

export default web3;
