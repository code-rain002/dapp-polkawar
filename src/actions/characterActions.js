import axios from "axios";
import baseUrl from "../actions/baseUrl";
import {
  GET_CHARACTERS,
  CREATE_CHARACTER,
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

//GET all characters of owner
export const getUserCharacters = () => async (dispatch) => {
  let userAddress = await getUserAddress();

  let response = await axios
    .get(`${baseUrl}/usercharacters/${userAddress}`)
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
      dispatch(getUserCharacters());
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
