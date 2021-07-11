

let constants;
if ((process.env.NODE_ENV === 'production')) {
  constants = {
    network_id: '56',
    network_address: 'https://bsc-dataseed.binance.org/',
    saleContractAddress: '0x93d0BfcbE61c55e0a94183D8EB4f8c6496A3a9Fb', //This will be the owner
    itemContractAddress: '0x44EeE203F8aD35dA2F8B30c74A3F291FaebF97b1'
  };
} else {
  constants = {
    network_id: '97',
    network_address: 'https://bsc-dataseed.binance.org/',
    saleContractAddress: '0x93d0BfcbE61c55e0a94183D8EB4f8c6496A3a9Fb',
    itemContractAddress: '0x44EeE203F8aD35dA2F8B30c74A3F291FaebF97b1'

  };
}

export default constants;


