import Web3 from 'web3';
import constants from './constants';

let airdropConstant;
// Mainnet

if (constants.net === 0) {
	airdropConstant = {
		rpcUrl: 'https://bsc-dataseed.binance.org/',
		chainId: 56, //Mainet
		api: 'V3X7VF8MVXS2P3XE457J5A5W5FEX8Z1FQK',
		contractAddress: '0x1877a92AaBDc83dc0567aAb137D3dA415ef067B9',
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
				inputs: [ { indexed: true, internalType: 'bytes32', name: 'requestId', type: 'bytes32' } ],
				name: 'requestedGetAirdrop',
				type: 'event',
			},
			{
				inputs: [ { internalType: 'uint256', name: '_amountToken', type: 'uint256' } ],
				name: 'chageAmountToken',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [ { internalType: 'uint256', name: '_claimDate', type: 'uint256' } ],
				name: 'chageClaimDate',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [ { internalType: 'uint256', name: '_acceptCount', type: 'uint256' } ],
				name: 'changeAcceptCount',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [ { internalType: 'uint256', name: '_endDate', type: 'uint256' } ],
				name: 'changeEndDate',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{ inputs: [], name: 'claimAirdrop', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [ { internalType: 'string', name: 'userProvidedSeed', type: 'string' } ],
				name: 'getAirdrop',
				outputs: [ { internalType: 'bytes32', name: '', type: 'bytes32' } ],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [ { internalType: 'uint256', name: 'index', type: 'uint256' } ],
				name: 'getItemURI',
				outputs: [ { internalType: 'string', name: '', type: 'string' } ],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'getTotalPaticipants',
				outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [ { internalType: 'string', name: 'uriHash', type: 'string' } ],
				name: 'initItems',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [ { internalType: 'address', name: 'user', type: 'address' } ],
				name: 'isJoinAirdrop',
				outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'isOwner',
				outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'itemIndexCounter',
				outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'name',
				outputs: [ { internalType: 'string', name: '', type: 'string' } ],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'owner',
				outputs: [ { internalType: 'address', name: '', type: 'address' } ],
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
				inputs: [ { internalType: 'address', name: 'newOwner', type: 'address' } ],
				name: 'transferOwnership',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{ inputs: [], name: 'withdrawLinkBalance', outputs: [], stateMutability: 'nonpayable', type: 'function' },
		],
	};
} else {
	airdropConstant = {
		rpcUrl: 'https://data-seed-prebsc-2-s1.binance.org:8545/',
		chainId: 97,
		api: 'V3X7VF8MVXS2P3XE457J5A5W5FEX8Z1FQK',
		contractAddress: '0xa4BfEdA021a53948e7e62fDC3164353fEF14C24b',
		abi: [
			{
				inputs: [
					{ internalType: 'contract PolkaWar', name: '_polkaWar', type: 'address' },
					{ internalType: 'address payable', name: '_fundOwner', type: 'address' },
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
				inputs: [
					{ internalType: 'uint256', name: '_beginDate', type: 'uint256' },
					{ internalType: 'uint256', name: '_endDate', type: 'uint256' },
				],
				name: 'changeDate',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [],
				name: 'claimAirdrop',
				outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'address[]', name: '_users', type: 'address[]' },
					{ internalType: 'uint256[]', name: '_tokenids', type: 'uint256[]' },
				],
				name: 'importData',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [],
				name: 'isOwner',
				outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'name',
				outputs: [ { internalType: 'string', name: '', type: 'string' } ],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'owner',
				outputs: [ { internalType: 'address', name: '', type: 'address' } ],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [ { internalType: 'address', name: '', type: 'address' } ],
				name: 'participants',
				outputs: [
					{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
					{ internalType: 'bool', name: 'isClaimed', type: 'bool' },
					{ internalType: 'bool', name: 'isValid', type: 'bool' },
				],
				stateMutability: 'view',
				type: 'function',
			},
			{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [ { internalType: 'address', name: 'newOwner', type: 'address' } ],
				name: 'transferOwnership',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{ inputs: [], name: 'withdrawPoolFund', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [ { internalType: 'contract IERC20', name: 'token', type: 'address' } ],
				name: 'withdrawToken',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{ stateMutability: 'payable', type: 'receive' },
		],
	};
}

var web3 = new Web3(window.ethereum);
var airdropContract = new web3.eth.Contract(airdropConstant.abi, airdropConstant.contractAddress);

export default airdropContract;
