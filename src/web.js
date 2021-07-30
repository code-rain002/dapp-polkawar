import Web3 from 'web3';
import constants from './utils/constants';
import provider from './provider';

var web3;

if (typeof window.web3 !== 'undefined') {
	// Use Mist/MetaMask's provider.
	web3 = new Web3(window.web3.currentProvider);
} else {
	if (provider.connected) {
		web3 = new Web3(provider);
	} else {
		// console.log('using infura provider')
		const infura =
			constants.net === 0
				? `https://mainnet.infura.io/v3/ac6badc7c51f4aae801958b26be994a1`
				: `https://kovan.infura.io/v3/ac6badc7c51f4aae801958b26be994a1`;

		web3 = new Web3(new Web3.providers.HttpProvider(infura));
	}
}
export default web3;
