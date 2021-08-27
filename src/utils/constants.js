// 0 mainnet, 1 testnet
let network_type = 1;

let constants;
constants = {
  net: network_type,
  sale_owner_address: process.env.REACT_APP_SALE_APPROVE_OWNER_ADDRESS, //Owner address for NFT Items Approve Fn
  xp_owner_address: process.env.REACT_APP_XP_APPROVE_OWNER_ADDRESS, //Owner address for XP approve fn
  // Flash sale constants
  itemsCount: "140",
  holdPWAR: "2000",
  itemPrice: "0.7",
  resellBNB: "0.75",
  rewardsPWAR: "1500",
  rewardDate: "31st of September,2021",
};

export default constants;
