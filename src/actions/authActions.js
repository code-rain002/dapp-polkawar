import axios from "axios";
import baseUrl from "../actions/baseUrl";
import { getUserAddress } from "./web3Actions";
import { GET_CURRENT_USER, REMOVE_CURRENT_USER, GET_ERRORS } from "./types";

//GET user authenticated
export const authenticateUser = () => async(dispatch) => {
  let user = localStorage.getItem("userAddress");

  if (!user) {
    let userAddress = await getUserAddress();
    localStorage.setItem("userAddress", userAddress);
  }
  dispatch({
    type: GET_CURRENT_USER,
    payload: true,
  });
  return true;
};

//GET user authenticated
export const checkAuthenticated = () => async(dispatch) => {
  let user = localStorage.getItem("userAddress");

  if (user) {
    dispatch({
      type: GET_CURRENT_USER,
      payload: true,
    });
    return true;
  } else {
    dispatch({
      type: GET_CURRENT_USER,
      payload: false,
    });
    return false;
  }
};
//User signout
export const signOutUser = (address) => (dispatch) => {
  dispatch({
    type: REMOVE_CURRENT_USER,
    payload: address,
  });
  localStorage.setItem("userAddress", "");
};
