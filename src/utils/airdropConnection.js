import Web3 from "web3";
import constants from "./constants";

let airdropConstant;
// Mainnet

if (constants.net === 0) {
  airdropConstant = {
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: 56, //Mainet
    contractAddress: "0xa1DAeA270F1250c9B91EFd0C38b1756038DF343f",
    abi: [
      {
        inputs: [
          {
            internalType: "contract PolkaWar",
            name: "_polkaWar",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "_fundOwner",
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
        inputs: [
          { internalType: "uint256", name: "_beginDate", type: "uint256" },
          { internalType: "uint256", name: "_endDate", type: "uint256" },
        ],
        name: "changeDate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "claimAirdrop",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address[]", name: "_users", type: "address[]" },
          { internalType: "uint256[]", name: "_tokenids", type: "uint256[]" },
        ],
        name: "importData",
        outputs: [],
        stateMutability: "nonpayable",
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
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bool", name: "isClaimed", type: "bool" },
          { internalType: "bool", name: "isValid", type: "bool" },
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
  airdropConstant = {
    rpcUrl: "https://data-seed-prebsc-2-s1.binance.org:8545/",
    chainId: 97,

    contractAddress: "0x60Df45898f6Dae42BB0514a9F5A362409b73d6fc",
    abi: [
      {
        inputs: [
          {
            internalType: "contract PolkaWar",
            name: "_polkaWar",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "_fundOwner",
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
        inputs: [
          { internalType: "uint256", name: "_beginDate", type: "uint256" },
          { internalType: "uint256", name: "_endDate", type: "uint256" },
        ],
        name: "changeDate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "claimAirdrop",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address[]", name: "_users", type: "address[]" },
          { internalType: "uint256[]", name: "_tokenids", type: "uint256[]" },
        ],
        name: "importData",
        outputs: [],
        stateMutability: "nonpayable",
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
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bool", name: "isClaimed", type: "bool" },
          { internalType: "bool", name: "isValid", type: "bool" },
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

var web3 = new Web3(window.ethereum);
var airdropContract = new web3.eth.Contract(
  airdropConstant.abi,
  airdropConstant.contractAddress
);

export default airdropContract;
