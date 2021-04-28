import axios from 'axios';
import baseUrl from '../actions/baseUrl';
import { GET_USER, GET_ERRORS } from './types';

//GET all characters
export const getUser = (address) => (dispatch) => {
  axios
    .get(`${baseUrl}/user/${address}`)
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};
