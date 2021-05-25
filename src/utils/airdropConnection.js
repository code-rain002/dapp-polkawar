import Web3 from 'web3';

const airdropConstant = {
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  chainId: 97, // Smart Chain - Testnet chain id
  api: 'V3X7VF8MVXS2P3XE457J5A5W5FEX8Z1FQK',
  contractAddress: '0xDeD7306a9C4Cd9C8b410E613e83820856AD8c791',
  abi: [
    {
      inputs: [
        { internalType: 'address', name: '_VRFCoordinator', type: 'address' },
        { internalType: 'address', name: '_LinkToken', type: 'address' },
        { internalType: 'bytes32', name: '_keyhash', type: 'bytes32' },
        { internalType: 'contract PolkaWarItemSystem', name: '_itemSystem', type: 'address' },
        { internalType: 'contract PolkaWar', name: '_polkaWar', type: 'address' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
        { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'bytes32', name: 'requestId', type: 'bytes32' }],
      name: 'requestedGetAirdrop',
      type: 'event',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_amountToken', type: 'uint256' }],
      name: 'chageAmountToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_claimDate', type: 'uint256' }],
      name: 'chageClaimDate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { inputs: [], name: 'claimAirdrop', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [{ internalType: 'string', name: 'userProvidedSeed', type: 'string' }],
      name: 'getAirdrop',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
      name: 'getItemURI',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'string', name: 'uriHash', type: 'string' }],
      name: 'initItems',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
      name: 'isJoinAirdrop',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'isOwner',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'itemIndexCounter',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: 'requestId', type: 'bytes32' },
        { internalType: 'uint256', name: 'randomness', type: 'uint256' },
      ],
      name: 'rawFulfillRandomness',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};

var web3 = new Web3(new Web3.providers.HttpProvider(airdropConstant.rpcUrl));

var airdropContract = new web3.eth.Contract(airdropConstant.abi, airdropConstant.contractAddress);

export default airdropContract;
