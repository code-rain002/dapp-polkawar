import Web3 from "web3";
import constants from "./constants";

let bidConstant;
// 0 for mainnet and 1 for testnet
if (constants.net === 0) {
  bidConstant = {
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: 56, // now testnet

    contractAddress: "0x524Dda79968D100B8C1Fbbb85C95c0cB07446581",
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
            internalType: "uint256",
            name: "_pid",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_bidPrice",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "_user",
            type: "address",
          },
        ],
        name: "_bid",
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
            name: "_pid",
            type: "uint256",
          },
        ],
        name: "_cancelBid",
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
            name: "_pid",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_tokenid",
            type: "uint256",
          },
        ],
        name: "_claim",
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
            name: "_pid",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "int256",
            name: "_combo",
            type: "int256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_nftTokenId",
            type: "uint256",
          },
        ],
        name: "_open",
        type: "event",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_pid", type: "uint256" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
          { internalType: "bytes32", name: "messageHash", type: "bytes32" },
        ],
        name: "bid",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
        name: "claim",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
        name: "getNumberParticipants",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_user", type: "address" },
          { internalType: "uint256", name: "_pid", type: "uint256" },
        ],
        name: "getUserInfo",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "uint256", name: "", type: "uint256" },
        ],
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
          { internalType: "string[]", name: "_items", type: "string[]" },
        ],
        name: "initNFTItems",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "string", name: "_urlHash", type: "string" },
          { internalType: "uint256", name: "_startPrice", type: "uint256" },
          { internalType: "uint256", name: "_beginDate", type: "uint256" },
          { internalType: "uint256", name: "_endDate", type: "uint256" },
        ],
        name: "initProgram",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              { internalType: "uint256", name: "amountBNB", type: "uint256" },
              { internalType: "uint256", name: "amountPWAR", type: "uint256" },
              { internalType: "uint256", name: "itemIndex", type: "uint256" },
            ],
            internalType: "struct PolkaWarNFTAuction.Reward",
            name: "_rewards",
            type: "tuple",
          },
        ],
        name: "initRewards",
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
        inputs: [
          { internalType: "address", name: "_user", type: "address" },
          { internalType: "uint256", name: "_pid", type: "uint256" },
        ],
        name: "isUserBid",
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
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "nftItems",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
        name: "open",
        outputs: [
          { internalType: "int256", name: "", type: "int256" },
          { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "nonpayable",
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
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "programs",
        outputs: [
          { internalType: "string", name: "urlHash", type: "string" },
          { internalType: "uint256", name: "startPrice", type: "uint256" },
          { internalType: "bool", name: "isActive", type: "bool" },
          { internalType: "uint256", name: "beginDate", type: "uint256" },
          { internalType: "uint256", name: "endDate", type: "uint256" },
          { internalType: "uint256", name: "latestPrice", type: "uint256" },
          {
            internalType: "address payable",
            name: "latestUser",
            type: "address",
          },
          { internalType: "uint256", name: "minPWARHolding", type: "uint256" },
          { internalType: "bool", name: "isClaimed", type: "bool" },
          { internalType: "int256", name: "comboRewards", type: "int256" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bool", name: "isOpened", type: "bool" },
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
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "rewards",
        outputs: [
          { internalType: "uint256", name: "amountBNB", type: "uint256" },
          { internalType: "uint256", name: "amountPWAR", type: "uint256" },
          { internalType: "uint256", name: "itemIndex", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_pid", type: "uint256" },
          { internalType: "int256", name: "_combo", type: "int256" },
        ],
        name: "setRewards",
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
        inputs: [
          { internalType: "uint256", name: "_pid", type: "uint256" },
          { internalType: "uint256", name: "_startPrice", type: "uint256" },
          { internalType: "uint256", name: "_beginDate", type: "uint256" },
          { internalType: "uint256", name: "_endDate", type: "uint256" },
        ],
        name: "updateProgram",
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
  bidConstant = {
    rpcUrl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    chainId: 97, // now testnet

    contractAddress: "0x3Bab70E701ea44e0d46178457a31FDE2F28DF4ED",
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
            internalType: "uint256",
            name: "_pid",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_bidPrice",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "_user",
            type: "address",
          },
        ],
        name: "_bid",
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
            name: "_pid",
            type: "uint256",
          },
        ],
        name: "_cancelBid",
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
            name: "_pid",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_tokenid",
            type: "uint256",
          },
        ],
        name: "_claim",
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
            name: "_pid",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "int256",
            name: "_combo",
            type: "int256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_nftTokenId",
            type: "uint256",
          },
        ],
        name: "_open",
        type: "event",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_pid", type: "uint256" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
          { internalType: "bytes32", name: "messageHash", type: "bytes32" },
        ],
        name: "bid",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
        name: "claim",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
        name: "getNumberParticipants",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_user", type: "address" },
          { internalType: "uint256", name: "_pid", type: "uint256" },
        ],
        name: "getUserInfo",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "uint256", name: "", type: "uint256" },
        ],
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
          { internalType: "string[]", name: "_items", type: "string[]" },
        ],
        name: "initNFTItems",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "string", name: "_urlHash", type: "string" },
          { internalType: "uint256", name: "_startPrice", type: "uint256" },
          { internalType: "uint256", name: "_beginDate", type: "uint256" },
          { internalType: "uint256", name: "_endDate", type: "uint256" },
        ],
        name: "initProgram",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              { internalType: "uint256", name: "amountBNB", type: "uint256" },
              { internalType: "uint256", name: "amountPWAR", type: "uint256" },
              { internalType: "uint256", name: "itemIndex", type: "uint256" },
            ],
            internalType: "struct PolkaWarNFTAuction.Reward",
            name: "_rewards",
            type: "tuple",
          },
        ],
        name: "initRewards",
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
        inputs: [
          { internalType: "address", name: "_user", type: "address" },
          { internalType: "uint256", name: "_pid", type: "uint256" },
        ],
        name: "isUserBid",
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
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "nftItems",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
        name: "open",
        outputs: [
          { internalType: "int256", name: "", type: "int256" },
          { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "nonpayable",
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
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "programs",
        outputs: [
          { internalType: "string", name: "urlHash", type: "string" },
          { internalType: "uint256", name: "startPrice", type: "uint256" },
          { internalType: "bool", name: "isActive", type: "bool" },
          { internalType: "uint256", name: "beginDate", type: "uint256" },
          { internalType: "uint256", name: "endDate", type: "uint256" },
          { internalType: "uint256", name: "latestPrice", type: "uint256" },
          {
            internalType: "address payable",
            name: "latestUser",
            type: "address",
          },
          { internalType: "uint256", name: "minPWARHolding", type: "uint256" },
          { internalType: "bool", name: "isClaimed", type: "bool" },
          { internalType: "int256", name: "comboRewards", type: "int256" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bool", name: "isOpened", type: "bool" },
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
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "rewards",
        outputs: [
          { internalType: "uint256", name: "amountBNB", type: "uint256" },
          { internalType: "uint256", name: "amountPWAR", type: "uint256" },
          { internalType: "uint256", name: "itemIndex", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_pid", type: "uint256" },
          { internalType: "int256", name: "_combo", type: "int256" },
        ],
        name: "setRewards",
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
        inputs: [
          { internalType: "uint256", name: "_pid", type: "uint256" },
          { internalType: "uint256", name: "_startPrice", type: "uint256" },
          { internalType: "uint256", name: "_beginDate", type: "uint256" },
          { internalType: "uint256", name: "_endDate", type: "uint256" },
        ],
        name: "updateProgram",
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
var bidContract = new web3.eth.Contract(
  bidConstant.abi,
  bidConstant.contractAddress
);

export default bidContract;
