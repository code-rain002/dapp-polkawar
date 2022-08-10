import airdropContract from "./../../utils/airdropConnection";
import itemContract from "./../../utils/itemConnection";
import characterContract from "./../../utils/characterConnection";
import pwrContract from "./../../utils/pwrConnection";
import pwarStakingContract from "./../../utils/pwarStakingConnection";
import flashsaleContract from "./../../utils/saleConnection";
import bidContract from "../../utils/bidConnection";
import { getUserAddress } from "../web3Actions";
import web3 from "../../web";
import axios from "axios";
import xpContract from "../../utils/xpConnection";
import pbrContract from "../../utils/pbrConnection";
import pbrMaticStakingContract from "../../utils/pbrMaticStakingConn";
import pbrTokenContract from "../../utils/pbrTokenConnection";
import pbrMaticTokenContract from "../../utils/pbrMaticTokenConn";
import shoefyStakeContract from "../../utils/shoefyConnection";
import solCloutContract from "../../utils/launchPadConnection";
import launchpadContract from "../../utils/launchPadConnection";
import launchpadContractBSC from "../../utils/launchpadBSCPbr";

//Airdrop Functions

//READ is user joined airdrop
//RETURNS number
export const isJoinAirdrop = (address) => {
  return airdropContract.methods
    .isJoinAirdrop(address)
    .call((err, response) => {
      return response;
    });
};

//READ is user joined airdrop
//RETURNS number
export const getParticipants = (address) => {
  return airdropContract.methods.participants(address).call((err, response) => {
    return response;
  });
};

//READ total no of participants
//RETURNS number
export const getTotalParticipants = async () => {
  return await airdropContract.methods
    .getTotalPaticipants()
    .call((err, response) => {
      return response;
    });
};

//Write getAirdrop
//RETURNS only execution function
export const getAirdrop = async (userAddress) => {
  let userProvidedSeed =
    "stable elegant thrive remind fitness carbon link lecture icon same license buyer final skirt holiday";
  console.log(userAddress);

  return await airdropContract.methods
    .getAirdrop(userProvidedSeed)
    .send({ from: userAddress }, (err, response) => {
      console.log("getAirdrop Called");
      if (err) {
        console.log("returning false");

        return false;
      } else {
        console.log("returning true");

        return true;
      }
    });
};

//Item Functions

//READ get NFT item hash
//RETURNS Item json string
export const tokenURI = (tokenId) => {
  return itemContract.methods.tokenURI(tokenId).call(async (err, response) => {
    return response;
  });
};

//Check isApproved or not
export const checkApproved = (tokenId) => {
  return itemContract.methods.getApproved(tokenId).call((err, response) => {
    return response;
  });
};

//Approve Item
export const approveItem = (address, tokenId) => {
  return itemContract.methods
    .approve(address, tokenId)
    .call((err, response) => {
      return response;
    });
};
//Character Functions

//WRITE create new character for user
//RETURNS Item json string
export const createCharacter = async (address, characterClass) => {
  let level0Characters = {
    Archer: "QmX6PKEGDCtrdwSjxsJB4575dpYcv1sQoZMCADrCyCGJYC",
    Magician: "QmeCUJbbR9JPKnX2Tk9jFFHrvkNoYsVh8exwJbZ8M2pf3z",
    Warrior: "QmP9yV42APdrWfTPLA4KtQiVjVc2qNxdPsxS5YdFiXdbcU",
  };
  let characterURI = level0Characters[characterClass];
  console.log("Address" + address);
  console.log("URI" + characterURI);

  const transaction = await new Promise((resolve, reject) => {
    characterContract.methods
      .createItem(address, characterURI)
      .send(
        { from: address, gasPrice: 25000000000 },
        function (error, transactionHash) {
          if (transactionHash) {
            resolve(transactionHash);
          } else {
            console.log("Failed by user!");
            reject();
          }
        }
      );
  });
  return transaction;
};

//READ get Owner Token ID
//RETURNS Item json string
export const tokenOfOwnerByIndex = (address, value) => {
  return characterContract.methods
    .tokenOfOwnerByIndex(address, value)
    .call(async (err, response) => {
      return response;
    });
};

//READ get Character item
//RETURNS Character json string
export const tokenURICharacter = (tokenId) => {
  return characterContract.methods
    .tokenURI(tokenId)
    .call(async (err, response) => {
      return response;
    });
};

//PWAR Functions

//Returns PWR Balance of User
export const getPwarBalance = async () => {
  let userAddress = await getUserAddress();
  let balance = await pwrContract.methods.balanceOf(userAddress).call();

  let pwarBalance = web3.utils.fromWei(balance.toString(), "ether");

  return pwarBalance;
};

//Returns Amount approved
export const checkPwarApproved = async (contractAddress) => {
  let userAddress = await getUserAddress();
  let allowance = await pwrContract.methods
    .allowance(userAddress, contractAddress)
    .call((err, res) => {
      return res;
    });

  return allowance;
};

//Flash Sale Functions

//READ
//Returns PWR Balance of User
export const checkIsPurchased = (userAddress) => {
  return flashsaleContract.methods
    .isPurchased(userAddress)
    .call(async (err, response) => {
      return response;
    });
};

//Bid  Functions

//READ
//Returns true or false
export const isUserBid = (userAddress, itemId) => {
  return bidContract.methods
    .isUserBid(userAddress, itemId)
    .call(async (err, response) => {
      return response;
    });
};

//Bid  Functions

//READ
//Returns true or false
export const isUserClaimed = async (itemId) => {
  let data = await bidContract.methods
    .programs(itemId)
    .call(async (err, response) => {
      return response;
    });

  return data.isClaimed;
};

//READ
//Returns true or false
export const isBoxOpened = async (itemId) => {
  let data = await bidContract.methods
    .programs(itemId)
    .call(async (err, response) => {
      return response;
    });
  return data.isOpened;
};

//READ
//Returns object
export const boxRewards = (programId) => {
  return bidContract.methods.programs(programId).call(async (err, response) => {
    return response;
  });
};

//PINATA Cloud api post and return hash
export const postToPinata = async (jsonData) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  let response = await axios
    .post(url, jsonData, {
      headers: {
        pinata_api_key: "af57e38fb541317c6578",
        pinata_secret_api_key:
          "8c203a0e66b83f9affe82caa41abc5d10329e40c5bade139e30fa97b5b4ad0a0",
      },
    })
    .then(function (res) {
      console.log(response.data);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  if (response.IpfsHash) {
    return response;
  } else {
    return false;
  }
};

// XP Contract Function
//Returns Amount holding or staking
export const checkPwarHolding = async () => {
  let userAddress = await getUserAddress();
  let holding = await xpContract.methods
    .getNumberHoldingOrStaking(userAddress)
    .call((err, res) => {
      return res / 1000;
    });
  let pwarBal = parseInt(web3.utils.fromWei(holding.toString(), "ether"));
  return pwarBal;
};

// PBR Staking Contract Connection ETH
//Returns Amount staking
export const checkPBRStakingAndHolding = async (address) => {
  // Ethereum Network
  let staking = await pbrContract.methods
    .getUserStakingData(address, 0)
    .call((err, res) => {
      return res;
    });
  let holding = await pbrTokenContract.methods
    .balanceOf(address)
    .call((err, res) => {
      return res;
    });
  let pbrStaked = parseInt(
    web3.utils.fromWei(staking.amount.toString(), "ether")
  );

  let pbrHolded = parseInt(web3.utils.fromWei(holding.toString(), "ether"));

  let totalPbr = pbrStaked + pbrHolded;

  console.log("totalPbr:" + totalPbr);

  // Matic Network
  let stakingMatic = await pbrMaticStakingContract.methods
    .userInfo(0, address)
    .call((err, res) => {
      return res;
    });

  let holdingMatic = await pbrMaticTokenContract.methods
    .balanceOf(address)
    .call((err, res) => {
      return res;
    });
  let pbrStakedMatic = parseInt(
    web3.utils.fromWei(stakingMatic.amount.toString(), "ether")
  );

  let pbrHoldedMatic = parseInt(
    web3.utils.fromWei(holdingMatic.toString(), "ether")
  );

  let totalPbrMatic = pbrStakedMatic + pbrHoldedMatic;
  console.log("totalPbrMatic:" + totalPbrMatic);

  let totalTokens = totalPbr + totalPbrMatic;
  console.log("Total Tokens:" + totalTokens);
  return totalTokens;
};

// PBR Staking Contract Connection ETH
//Returns Amount staking
export const checkPBRStaking = async (address) => {
  try {
    // Ethereum Network
    let staking = await pbrContract.methods
      .getUserStakingData(address, 0)
      .call((err, res) => {
        return res;
      });

    let pbrStaked = parseInt(
      web3.utils.fromWei(staking.amount.toString(), "ether")
    );

    // Matic Network
    let stakingMatic = await pbrMaticStakingContract.methods
      .userInfo(0, address)
      .call((err, res) => {
        return res;
      });

    let pbrStakedMatic = parseInt(
      web3.utils.fromWei(stakingMatic.amount.toString(), "ether")
    );

    // BSC Network
    let stakingBsc = await pwarStakingContract.methods
      .userInfo(5, address)
      .call((err, res) => {
        return res;
      });

    let pbrStakedBsc = parseInt(
      web3.utils.fromWei(stakingBsc.amount.toString(), "ether")
    );

    let totalTokens = pbrStaked + pbrStakedMatic + pbrStakedBsc;
    console.log("Total Tokens:" + totalTokens);
    return totalTokens;
  } catch (err) {
    return -1;
  }
};

// PWAR Staking and Holding Function
export const checkPWARStakingAndHolding = async (address) => {
  try {
    let staking = await pwarStakingContract.methods
      .userInfo(1, address)
      .call((err, res) => {
        return res;
      });

    let holding = await pwrContract.methods
      .balanceOf(address)
      .call((err, res) => {
        return res;
      });
    let pwarStaked = parseInt(
      web3.utils.fromWei(staking.amount.toString(), "ether")
    );

    let pwarHolded = parseInt(web3.utils.fromWei(holding.toString(), "ether"));

    let totalPwar = pwarStaked + pwarHolded;

    console.log("totalPwar:" + totalPwar);

    return totalPwar;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

// Shoefy Staking Contract Connection ETH
//Returns Amount staking
export const shoefyStakingAmount = async (address) => {
  let staking = await shoefyStakeContract.methods
    .userInfo(3, address)
    .call((err, res) => {
      return res;
    });

  let shoefyStaked = parseInt(
    web3.utils.fromWei(staking.amount.toString(), "ether")
  );

  console.log("Total Tokens:" + shoefyStaked);
  return shoefyStaked;
};

// Labs Staking Contract Connection ETH
//Returns Amount staking
export const checkLabsStakingAmount = async (address) => {
  let staking = await shoefyStakeContract.methods
    .userInfo(5, address)
    .call((err, res) => {
      return res;
    });

  let labsStaked = parseInt(
    web3.utils.fromWei(staking.amount.toString(), "ether")
  );

  console.log("Total Tokens:" + labsStaked);
  return labsStaked;
};

// Launchpad Staking Contract Connection ETH
//Returns Amount staking
export const checkTokenDataAmount = async (address) => {
  let result = await launchpadContractBSC.methods
    .getUserInfo(1, address)
    .call((err, res) => {
      return res;
    });
  console.log(result);
  let TotalTokenPurchase = parseInt(web3.utils.fromWei(result[1], "ether"));
  let TotalPercentClaimed = result[3].toString();

  return {
    purchase: TotalTokenPurchase,
    percent: TotalPercentClaimed,
  };
};

// Saga TotalEth Value
//Returns Amount Saga
export const sagaTotalPurchase = async (address) => {
  let result = await launchpadContract.methods
    .users(1, address)
    .call((err, res) => {
      return res;
    });

  let ethValue = web3.utils.fromWei(
    result.TotalETHPurchase.toString(),
    "ether"
  );

  console.log(ethValue);

  return ethValue;
};
