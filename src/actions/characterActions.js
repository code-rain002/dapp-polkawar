import axios from "axios";
import baseUrl from "../actions/baseUrl";
import { GET_CHARACTERS, GET_ERRORS } from "./types";

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
  // let response = await axios
  //   .get("https://reqres.in/api/users?page=2")
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });
  return response;
};

//POST character created from user
//Arguments (tokenId,type);
export const createUserCharacter = (tokenId, type) => (dispatch) => {
  let characterData = {
    tokenId: tokenId,
    type: type,
  };
  axios
    .post(`${baseUrl}/character/create}`, { characterData })
    .then((res) => {
      console.log(res.data);
      // dispatch({
      //   type: CREATE_CHARACTER,
      //   payload: res.data,
      // });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};
