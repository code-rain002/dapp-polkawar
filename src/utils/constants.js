// 0 mainnet, 1 testnet
let network_type = 0;

let constants;
constants = {
  net: network_type,
  sale_owner_address: process.env.REACT_APP_SALE_APPROVE_OWNER_ADDRESS, //Owner address for NFT Items Approve Fn
};

export default constants;
