import WalletConnectProvider from "@walletconnect/web3-provider";

const provider = new WalletConnectProvider({
  infuraId: process.env.REACT_APP_INFURA_KEY,
  qrcodeModalOptions: {
    mobileLinks: ["metamask", "trust"],
  },
});

//Let's commit
export default provider;
