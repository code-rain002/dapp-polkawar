import WalletConnectProvider from '@walletconnect/web3-provider';

const provider = new WalletConnectProvider({
	infuraId: '6f0ba6da417340e6b1511be0f2bc389b',
	rpc: {
		97: 'https://data-seed-prebsc-2-s3.binance.org:8545/',
	},
});

export default provider;
