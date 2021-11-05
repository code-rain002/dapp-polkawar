// 0 mainnet, 1 testnet
let network_type = 0;

let constants;
constants = {
  net: network_type,
  sale_owner_address: process.env.REACT_APP_SALE_APPROVE_OWNER_ADDRESS, //Owner address for NFT Items Approve Fn
  xp_owner_address: process.env.REACT_APP_XP_APPROVE_OWNER_ADDRESS, //Owner address for XP approve fn

  // Flash sale constants
  itemsCount: "200",
  holdPWAR: "2000",
  itemPrice: "1.0",
  resellBNB: "1.1",
  rewardsPWAR: "1500",
  rewardDate: "1st of December,2021",
};

export default constants;
