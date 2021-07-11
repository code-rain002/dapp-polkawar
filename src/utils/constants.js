

let constants;
if ((process.env.NODE_ENV === 'production')) {
  constants = {
    network_id: '56',
    network_address: 'https://bsc-dataseed.binance.org/',
    saleContractAddress: '0x772611731D3C011ba282E400A056681b96B55783', //This will be the owner
    itemContractAddress: '0x44EeE203F8aD35dA2F8B30c74A3F291FaebF97b1'
  };
} else {
  constants = {
    network_id: '97',
    network_address: 'https://bsc-dataseed.binance.org/',
    saleContractAddress: '0x772611731D3C011ba282E400A056681b96B55783',
    itemContractAddress: '0x44EeE203F8aD35dA2F8B30c74A3F291FaebF97b1'

  };
}

export default constants;


