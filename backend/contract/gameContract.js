var Web3 = require("web3");
let gameConstant;

gameConstant = {
  rpcUrl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
  chainId: 97, //Testnet

  contractAddress: "0x0942E9A2d6e3492EEdD152D80857622b034966a3",
  abi: [
    {
      inputs: [
        { internalType: "address", name: "_tokenAddress", type: "address" },
        { internalType: "uint256", name: "_rewardMultiplier", type: "uint256" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "pid",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "winnerAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "award",
          type: "uint256",
        },
      ],
      name: "LogClaimAward",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "PWAR",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenAmount", type: "uint256" },
      ],
      name: "addPool",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
      name: "bet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
      name: "claimAward",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
      name: "getGamePlayers",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_player", type: "address" },
        { internalType: "uint256", name: "_pid", type: "uint256" },
      ],
      name: "getPlayerIndexInPool",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_player", type: "address" }],
      name: "getPoolIdsContainingPlayer",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
      name: "getPoolInfoById",
      outputs: [
        { internalType: "enum PolkaWar.GameState", name: "", type: "uint8" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "address[]", name: "", type: "address[]" },
        { internalType: "address[]", name: "", type: "address[]" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_player", type: "address" },
        { internalType: "uint256", name: "_pid", type: "uint256" },
      ],
      name: "getWinnerIndexInPool",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "poolLength",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "pools",
      outputs: [
        {
          internalType: "enum PolkaWar.GameState",
          name: "state",
          type: "uint8",
        },
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "uint256", name: "tokenAmount", type: "uint256" },
        { internalType: "uint256", name: "drawStatus", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
      name: "revoke",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "rewardMultiplier",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "address[]", name: "_winners", type: "address[]" },
        { internalType: "uint256", name: "drawStatus", type: "uint256" },
      ],
      name: "updateGameStatus",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "uint256", name: "_tokenAmount", type: "uint256" },
      ],
      name: "updatePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawFund",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

var provider = gameConstant.rpcUrl;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);

var gameContract = new web3.eth.Contract(
  gameConstant.abi,
  gameConstant.contractAddress
);

module.exports = gameContract;
