import WalletConnectProvider from "@walletconnect/web3-provider";
import getInfuraKey from "./actions/smartActions/helper";

let providerKey = getInfuraKey();

const provider = new WalletConnectProvider({
  infuraId: providerKey,
  qrcodeModalOptions: {
    mobileLinks: ["metamask", "trust"],
  },
});

//Let's commit
export default provider;
