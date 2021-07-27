let constants;

//Mainnet
constants = {
	net: 0, // 0 mainnet, 1 testnet
	network_id: '56',
	network_address: 'https://bsc-dataseed.binance.org/',
	saleContractAddress: '0xC10f00254b6B475348BdA9C11eeB14beafd5E3a3', //This will be the owner
	itemContractAddress: '0x68899569f9D4d3Ec7D947691BaD4B93ee418926F',
};

//Testnet
// constants = {
// 	net: 1, // 0 mainnet, 1 testnet
// 	network_id: '56',
// 	network_address: 'https://bsc-dataseed.binance.org/',
// 	saleContractAddress: '0xb8D9288D6D8E74fB2C09f5d24a0dF194EBb1F208', //This will be the owner
// 	itemContractAddress: '0x44EeE203F8aD35dA2F8B30c74A3F291FaebF97b1',
// };

export default constants;
