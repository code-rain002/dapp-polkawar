import airdropContract from './../../utils/airdropConnection';
import itemContract from './../../utils/itemConnection';
import characterContract from './../../utils/characterConnection';
import pwrContract from './../../utils/pwrConnection';
import constants from './../../utils/constants';

//Airdrop Functions

//READ is user joined airdrop
//RETURNS number
export const isJoinAirdrop = (address) => {
  return airdropContract.methods.isJoinAirdrop(address).call((err, response) => {
    console.log('isJoinAirdrop: ' + response);

    return response;
  });
};

//READ total no of participants
//RETURNS number
export const getTotalParticipants = async () => {
  return await airdropContract.methods.getTotalPaticipants().call((err, response) => {
    console.log('getTotalParticipants: ' + response);

    return response;
  });
};

//Write getAirdrop
//RETURNS only execution function
export const getAirdrop = async (userAddress) => {
  let userProvidedSeed =
    'stable elegant thrive remind fitness carbon link lecture icon same license buyer final skirt holiday';
  console.log(userAddress);

  return await airdropContract.methods.getAirdrop(userProvidedSeed).send({ from: userAddress }, (err, response) => {
    console.log('getAirdrop Called');
    if (err) {
      console.log('returning false');

      return false;
    } else {
      console.log('returning true');

      return true;
    }
  });
};

//Item Functions

//READ get NFT item hash
//RETURNS Item json string
export const tokenURI = (tokenId) => {
  return itemContract.methods.tokenURI(tokenId).call(async (err, response) => {
    console.log('tokenURI: ' + response);
    return response;
  });
};

//Check isApproved or not
export const checkApproved = (userAddress) => {
  return itemContract.methods.allowance(userAddress, constants.itemContractAddress).call((err, response) => {
    return response;
  });
};

//Character Functions

//WRITE create new character for user
//RETURNS Item json string
export const createCharacter = async (address, characterClass) => {
  let level0Characters = {
    Archer: 'QmX6PKEGDCtrdwSjxsJB4575dpYcv1sQoZMCADrCyCGJYC',
    Magician: 'QmeCUJbbR9JPKnX2Tk9jFFHrvkNoYsVh8exwJbZ8M2pf3z',
    Warrior: 'QmP9yV42APdrWfTPLA4KtQiVjVc2qNxdPsxS5YdFiXdbcU',
  };
  let characterURI = level0Characters[characterClass];
  console.log('Address' + address);
  console.log('URI' + characterURI);

  const transaction = await new Promise((resolve, reject) => {
    characterContract.methods
      .createItem(address, characterURI)
      .send({ from: address }, function (error, transactionHash) {
        if (transactionHash) {
          resolve(transactionHash);
        } else {
          console.log('Failed by user!');
          reject();
        }
      });
  });
};

//READ get Owner Token ID
//RETURNS Item json string
export const tokenOfOwnerByIndex = (address, value) => {
  return characterContract.methods.tokenOfOwnerByIndex(address, value).call(async (err, response) => {
    return response;
  });
};

//READ get Character item
//RETURNS Character json string
export const tokenURICharacter = (tokenId) => {
  return characterContract.methods.tokenURI(tokenId).call(async (err, response) => {
    return response;
  });
};

//PWAR Functions

//READ
//Returns PWR Balance of User
export const getPwarBalance = (userAddress) => {
  return pwrContract.methods.balanceOf(userAddress).call(async (err, response) => {
    return response;
  });
};
