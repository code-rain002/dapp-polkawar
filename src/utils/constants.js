

let constants;
if ((process.env.NODE_ENV === 'production')) {
  constants = {
    network_id: '56',
    network_address: 'https://bsc-dataseed.binance.org/',
    saleContractAddress: '0x268A31FFC318f0603b9f4B11122291869E1EC678', //This will be the owner
    itemContractAddress: '0x44EeE203F8aD35dA2F8B30c74A3F291FaebF97b1'
  };
} else {
  constants = {
    network_id: '97',
    network_address: 'https://bsc-dataseed.binance.org/',
    saleContractAddress: '0x268A31FFC318f0603b9f4B11122291869E1EC678',
    itemContractAddress: '0x44EeE203F8aD35dA2F8B30c74A3F291FaebF97b1'

  };
}

export default constants;


