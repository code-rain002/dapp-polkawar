import WalletConnectProvider from '@walletconnect/web3-provider';

const provider = new WalletConnectProvider({
	infuraId: 'ac6badc7c51f4aae801958b26be994a1',
	qrcodeModalOptions: {
		mobileLinks: [ 'metamask', 'trust' ],
	},
});

//Let's commit
export default provider;
