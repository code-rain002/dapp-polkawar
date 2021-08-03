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
export const getCharacters = () => async (dispatch) => {
  let response = await axios
    .get(`${baseUrl}/characters`)
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

//POST character created from user
//Arguments (tokenId,type);
export const createUserCharacter =
  (contract_token_id, character_id, username) => async (dispatch) => {
    let url = `${baseUrl}/usercharacter`;

    let owner = await getUserAddress();
    let characterData = {
      token_id: contract_token_id,
      character_id: character_id,
      owner: owner,
      username: username,
    };

    axios
      .post(url, characterData)
      .then((res) => {
        dispatch(getCharacters());
      })
      .catch((err) => {
        console.log(err);

        dispatch({
          type: GET_ERRORS,
          payload: err.response,
        });
      });
  };
