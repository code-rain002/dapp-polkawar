

let constants;
if ((process.env.NODE_ENV === 'production')) {
  constants = {
    network_id: '56',
    network_address: 'https://bsc-dataseed.binance.org/',
    saleContractAddress: '0x384efcC1c165FC9fB3367266775e7e0Ec9F248C3',
    itemContractAddress: '0x44EeE203F8aD35dA2F8B30c74A3F291FaebF97b1'
  };
} else {
  constants = {
    network_id: '97',
    network_address: 'https://bsc-dataseed.binance.org/',
    saleContractAddress: '0x384efcC1c165FC9fB3367266775e7e0Ec9F248C3',
    itemContractAddress: '0x44EeE203F8aD35dA2F8B30c74A3F291FaebF97b1'

  };
}

export default constants;


