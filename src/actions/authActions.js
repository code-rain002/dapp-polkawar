import axios from 'axios';
import baseUrl from '../actions/baseUrl';
import { GET_CURRENT_USER, REMOVE_CURRENT_USER, GET_ERRORS } from './types';

//GET user authenticated
export const authenticateUser = (address) => (dispatch) => {
  let userData = {
    address: address,
  };
  axios
    .post(`${baseUrl}/user`, userData)
    .then((res) => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data,
      });
      localStorage.setItem('userAddress', address);
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

//User signout
export const signOutUser = (address) => (dispatch) => {
  dispatch({
    type: REMOVE_CURRENT_USER,
    payload: address,
  });
  localStorage.setItem('userAddress', '');
};
