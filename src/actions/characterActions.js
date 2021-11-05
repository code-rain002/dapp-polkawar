import axios from "axios";
import baseUrl from "../actions/baseUrl";
import {
  GET_CHARACTERS,
  GET_TOP100_CHARACTERS,
  CREATE_CHARACTER,
  GET_CHARACTER_RANK,
  GET_USER_CHARACTERS,
  GET_ERRORS,
} from "./types";
import { getUserAddress } from "./web3Actions";

//GET all characters
export const getTopCharacters = () => async (dispatch) => {
  let response = await axios
    .get(`${baseUrl}/usercharacter-top`)
    .then((res) => {
      dispatch({
        type: GET_CHARACTERS,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
      return err;
    });

  return response;
};

//GET top 100 characters
export const getTop100Characters = (pageNo) => async (dispatch) => {
  let response = await axios
    .get(`${baseUrl}/usercharacter-top100/${pageNo}`)
    .then((res) => {
      dispatch({
        type: GET_TOP100_CHARACTERS,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
      return err;
    });

  return response;
};

//GET Character Rank
export const getCharacterRank = () => async (dispatch) => {
  let userAddress = await getUserAddress();

  let response = await axios
    .get(`${baseUrl}/usercharacter-rank/${userAddress}`)
    .then((res) => {
      dispatch({
        type: GET_CHARACTER_RANK,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
      return err;
    });

  return response;
};

//GET all characters of owner
export const getUserCharacter = () => async (dispatch) => {
  let userAddress = await getUserAddress();
  // let userAddress = "0x82C5C4fCd9189eE0160343203D52f97D0B7cABb6";

  let response = await axios
    .get(`${baseUrl}/usercharacter/${userAddress}`)
    .then((res) => {
      dispatch({
        type: GET_USER_CHARACTERS,
        payload: res.data,
      });
      return true;
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
      return false;
    });

  return response;
};

//POST character created from user
//Arguments (tokenId,type);
export const createUserCharacter = (characterData) => async (dispatch) => {
  let url = `${baseUrl}/usercharacter`;
  let response = axios
    .post(url, characterData)
    .then((res) => {
      dispatch(getUserCharacter());
      return true;
    })
    .catch((err) => {
      console.log(err);

      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
      return false;
    });
  return response;
};

// GET Max Statistics Values of Character by address
export const getMaxStatsOfCharacter = () => async (dispatch) => {
  let userAddress = await getUserAddress();

  let response = await axios
    .get(`${baseUrl}/usercharacter/max-stats/${userAddress}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return response;
};

// GET User character XP
export const getXpByOwner = () => async (dispatch) => {
  let userAddress = await getUserAddress();

  let response = await axios
    .get(`${baseUrl}/xp/${userAddress}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return response;
};

// POST Update User character XP
export const updateXpOfOwner = (blockNo) => async (dispatch) => {
  let userAddress = await getUserAddress();
  let data = {
    blockNo,
    owner: userAddress,
  };
  let response = await axios
    .post(`${baseUrl}/xp`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return response;
};
