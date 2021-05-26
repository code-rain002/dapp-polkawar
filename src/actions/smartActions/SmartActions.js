import airdropContract from './../../utils/airdropConnection';
import itemContract from './../../utils/itemConnection';
import characterContract from './../../utils/characterConnection';
import pwrContract from './../../utils/pwrConnection';
import axios from 'axios';
import imageBaseUrl from './../imageBaseUrl';

//Airdrop Functions

//READ is user joined airdrop
//RETURNS number
export const isJoinAirdrop = (address) => {
  return airdropContract.methods.isJoinAirdrop(address).call((err, response) => {
    console.log('isJoinAirdrop: ' + response);

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
    console.log('getAirdrop');
    console.log(err);

    return true;
  });
};

//READ get NFT item hash
//RETURNS Item json string
export const tokenURI = (tokenId) => {
  return itemContract.methods.tokenURI(tokenId).call(async (err, response) => {
    console.log('tokenURI: ' + response);
    return response;
  });
};

//Character Functions

//WRITE create new character for user
//RETURNS Item json string
export const createItem = async (address, characterClass) => {
  let level0Characters = {
    Archer: 'QmPcXjjpsVAAKhd7qk6xknaUj3k1S2ypWMXRRBa5GM77wZ',
    Magician: 'QmVHa4x8irQfGvHPDtSxCKgNZHcQKXV388hmCVZ7LvQ8wZ',
    Warrior: 'QmV4JekQLh65rBRQVR7A5u3SfaTHyrniVbxzbiihYwDqiR',
  };
  let characterURI = level0Characters[characterClass];
  console.log('Address' + address);
  console.log('URI' + characterURI);

  return await characterContract.methods.createItem(address, characterURI).send({ from: address }, (err, response) => {
    console.log('createItem');
    console.log(err);
    console.log(response);
    if (err) {
      return false;
    } else {
      return true;
    }
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
