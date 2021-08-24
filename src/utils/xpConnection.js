import Web3 from "web3";
import constants from "./constants";

let xpConstant;

if (constants.net === 0) {
  xpConstant = {
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: 56, // Mainnet
    contractAddress: "0x43970DB0da5d839a7c5dC04101e8C3324b4B3943",
    abi: [
      {
        inputs: [
          {
            internalType: "contract PolkaWar",
            name: "_polkaWar",
            type: "address",
          },
          {
            internalType: "contract CorgibStaking",
            name: "_staking",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "_fundOwner",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "_marketingFund",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
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
            indexed: false,
            internalType: "address",
            name: "_user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_totalPWAR",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_numberClaim",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_timeStamp",
            type: "uint256",
          },
        ],
        name: "claimXPEvent",
        type: "event",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "arrParticipants",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseXP",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "burnPercent",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_beginDate", type: "uint256" },
          { internalType: "uint256", name: "_endDate", type: "uint256" },
          { internalType: "uint256", name: "_minimumHolding", type: "uint256" },
          { internalType: "uint256", name: "_baseAmount", type: "uint256" },
          { internalType: "uint256", name: "_maxClaimNumber", type: "uint256" },
          { internalType: "uint256", name: "_baseXP", type: "uint256" },
          { internalType: "uint256", name: "_devPercent", type: "uint256" },
          {
            internalType: "uint256",
            name: "_marketingPercent",
            type: "uint256",
          },
          { internalType: "uint256", name: "_burnPercent", type: "uint256" },
        ],
        name: "changeConstant",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "characterLevel", type: "uint256" },
        ],
        name: "claimXP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "devPercent",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "_user", type: "address" }],
        name: "getCycleTimeClaim",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "getNumberClaim",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "getNumberHoldingOrStaking",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getTotalParticipants",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "poolId", type: "uint256" },
        ],
        name: "getUserStakingData",
        outputs: [
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "rewardDebt", type: "uint256" },
          { internalType: "uint256", name: "rewardClaimed", type: "uint256" },
          { internalType: "uint256", name: "lastBlock", type: "uint256" },
          { internalType: "uint256", name: "beginTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isOwner",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "marketingPercent",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxClaimNumber",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "minimumHolding",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
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
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "participants",
        outputs: [
          { internalType: "uint256", name: "numberClaimed", type: "uint256" },
          { internalType: "uint256", name: "totalXPClaimed", type: "uint256" },
          { internalType: "uint256", name: "lastClaimed", type: "uint256" },
          { internalType: "uint256", name: "characterLevel", type: "uint256" },
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
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdrawPoolFund",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "contract IERC20", name: "token", type: "address" },
        ],
        name: "withdrawToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      { stateMutability: "payable", type: "receive" },
    ],
  };
} else {
  xpConstant = {
    rpcUrl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    chainId: 97, //Testnet
    contractAddress: "0x5AAa220472ED1CCd1C84c82f25eca7B794226316",
    abi: [
      {
        inputs: [
          {
            internalType: "contract PolkaWar",
            name: "_polkaWar",
            type: "address",
          },
          {
            internalType: "contract CorgibStaking",
            name: "_staking",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "_fundOwner",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "_marketingFund",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
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
            indexed: false,
            internalType: "address",
            name: "_user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_totalPWAR",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_numberClaim",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_timeStamp",
            type: "uint256",
          },
        ],
        name: "claimXPEvent",
        type: "event",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "arrParticipants",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseXP",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "burnPercent",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_beginDate", type: "uint256" },
          { internalType: "uint256", name: "_endDate", type: "uint256" },
          { internalType: "uint256", name: "_minimumHolding", type: "uint256" },
          { internalType: "uint256", name: "_baseAmount", type: "uint256" },
          { internalType: "uint256", name: "_maxClaimNumber", type: "uint256" },
          { internalType: "uint256", name: "_baseXP", type: "uint256" },
          { internalType: "uint256", name: "_devPercent", type: "uint256" },
          {
            internalType: "uint256",
            name: "_marketingPercent",
            type: "uint256",
          },
          { internalType: "uint256", name: "_burnPercent", type: "uint256" },
        ],
        name: "changeConstant",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "characterLevel", type: "uint256" },
        ],
        name: "claimXP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "devPercent",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "_user", type: "address" }],
        name: "getCycleTimeClaim",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "getNumberClaim",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "getNumberHoldingOrStaking",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getTotalParticipants",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "poolId", type: "uint256" },
        ],
        name: "getUserStakingData",
        outputs: [
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "rewardDebt", type: "uint256" },
          { internalType: "uint256", name: "rewardClaimed", type: "uint256" },
          { internalType: "uint256", name: "lastBlock", type: "uint256" },
          { internalType: "uint256", name: "beginTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isOwner",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "marketingPercent",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxClaimNumber",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "minimumHolding",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
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
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "participants",
        outputs: [
          { internalType: "uint256", name: "numberClaimed", type: "uint256" },
          { internalType: "uint256", name: "totalXPClaimed", type: "uint256" },
          { internalType: "uint256", name: "lastClaimed", type: "uint256" },
          { internalType: "uint256", name: "characterLevel", type: "uint256" },
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
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdrawPoolFund",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "contract IERC20", name: "token", type: "address" },
        ],
        name: "withdrawToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      { stateMutability: "payable", type: "receive" },
    ],
  };
}

// var provider = "https://data-seed-prebsc-2-s3.binance.org:8545/";
// var web3Provider = new Web3.providers.HttpProvider(provider);
// var web3 = new Web3(web3Provider);

var web3 = new Web3(window.ethereum);

var xpContract = new web3.eth.Contract(
  xpConstant.abi,
  xpConstant.contractAddress
);

export default xpContract;
