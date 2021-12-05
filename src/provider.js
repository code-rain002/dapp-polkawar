import WalletConnectProvider from "@walletconnect/web3-provider";
import getInfuraKey from "./actions/smartActions/helper";

let providerKey = getInfuraKey();

const provider = new WalletConnectProvider({
<<<<<<< HEAD
	infuraId: process.env.REACT_APP_INFURA_KEY,
	qrcodeModalOptions: {
		mobileLinks: [ 'metamask', 'trust' ],
	},
=======
  infuraId: providerKey,
  qrcodeModalOptions: {
    mobileLinks: ["metamask", "trust"],
  },
>>>>>>> main
});

//Let's commit
export default provider;
