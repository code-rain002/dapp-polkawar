import Web3 from "web3";
import constants from "./constants";

let saleConstant;
if (constants.net === 0) {
  saleConstant = {
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: 56, // Smart Chain - Mainnet chain id
    contractAddress: "0xA3629f9fd58DC2d980461CE7bc55B73B9aeedeA3",
    abi: [
      {
        inputs: [
          {
            internalType: "contract PolkaWarItemSystem",
            name: "_itemSystem",
            type: "address",
          },
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
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "itemInfoHash",
            type: "string",
          },
        ],
        name: "purchaseEvent",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "resellEvent",
        type: "event",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_beginDate", type: "uint256" },
          { internalType: "uint256", name: "_endDate", type: "uint256" },
          {
            internalType: "uint256",
            name: "_maximumSoldCount",
            type: "uint256",
          },
          { internalType: "uint256", name: "_maximumPerItem", type: "uint256" },
          { internalType: "uint256", name: "_price", type: "uint256" },
          { internalType: "uint256", name: "_buybackprice", type: "uint256" },
          {
            internalType: "uint256",
            name: "_resellBeginDate",
            type: "uint256",
          },
          { internalType: "uint256", name: "_resellEndDate", type: "uint256" },
          { internalType: "uint256", name: "_minimumHolding", type: "uint256" },
        ],
        name: "changeConstant",
        outputs: [],
        stateMutability: "nonpayable",
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
        inputs: [
          { internalType: "uint256[]", name: "_lstItem", type: "uint256[]" },
        ],
        name: "initItem",
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
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "isPurchased",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "listItem",
        outputs: [
          { internalType: "uint256", name: "countSlot", type: "uint256" },
          { internalType: "bool", name: "isValid", type: "bool" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maximumPerItem",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maximumSoldCount",
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
        inputs: [
          { internalType: "uint256", name: "itemId", type: "uint256" },
          { internalType: "string", name: "itemInfoHash", type: "string" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
          { internalType: "bytes32", name: "messageHash", type: "bytes32" },
        ],
        name: "purchaseItem",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "payable",
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
        inputs: [],
        name: "resellItemForSystem",
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
  saleConstant = {
    rpcUrl: "https://data-seed-prebsc-2-s1.binance.org:8545/",
    chainId: 97, // Testnet
    contractAddress: "0x9bBE291eD65604888F6E259e5DD7aEEf2573F811",

    abi: [
      {
        inputs: [
          {
            internalType: "contract PolkaWarItemSystem",
            name: "_itemSystem",
            type: "address",
          },
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
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "itemInfoHash",
            type: "string",
          },
        ],
        name: "purchaseEvent",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "resellEvent",
        type: "event",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_beginDate", type: "uint256" },
          { internalType: "uint256", name: "_endDate", type: "uint256" },
          {
            internalType: "uint256",
            name: "_maximumSoldCount",
            type: "uint256",
          },
          { internalType: "uint256", name: "_maximumPerItem", type: "uint256" },
          { internalType: "uint256", name: "_price", type: "uint256" },
          { internalType: "uint256", name: "_buybackprice", type: "uint256" },
          {
            internalType: "uint256",
            name: "_resellBeginDate",
            type: "uint256",
          },
          { internalType: "uint256", name: "_resellEndDate", type: "uint256" },
          { internalType: "uint256", name: "_minimumHolding", type: "uint256" },
        ],
        name: "changeConstant",
        outputs: [],
        stateMutability: "nonpayable",
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
        inputs: [
          { internalType: "uint256[]", name: "_lstItem", type: "uint256[]" },
        ],
        name: "initItem",
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
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "isPurchased",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "listItem",
        outputs: [
          { internalType: "uint256", name: "countSlot", type: "uint256" },
          { internalType: "bool", name: "isValid", type: "bool" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maximumPerItem",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maximumSoldCount",
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
        inputs: [
          { internalType: "uint256", name: "itemId", type: "uint256" },
          { internalType: "string", name: "itemInfoHash", type: "string" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
          { internalType: "bytes32", name: "messageHash", type: "bytes32" },
        ],
        name: "purchaseItem",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "payable",
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
        inputs: [],
        name: "resellItemForSystem",
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
var saleContract = new web3.eth.Contract(
  saleConstant.abi,
  saleConstant.contractAddress
);

export default saleContract;
