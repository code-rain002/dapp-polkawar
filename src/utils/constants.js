

let constants;
if ((process.env.NODE_ENV === 'production')) {
  constants = {
    network_id: '56',
    network_address: 'https://bsc-dataseed.binance.org/',
    saleContractAddress: '0x68899569f9D4d3Ec7D947691BaD4B93ee418926F',
  };
} else {
  constants = {
    network_id: '97',
    network_address: 'https://bsc-dataseed.binance.org/',
    saleContractAddress: '0x384efcC1c165FC9fB3367266775e7e0Ec9F248C3',
  };
}

export default constants;


