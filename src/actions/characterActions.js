import axios from 'axios';
import baseUrl from '../actions/baseUrl';
import { GET_CHARACTERS, GET_ERRORS } from './types';

//GET all characters
export const getCharacters = () => (dispatch) => {
  axios
    .get(`${baseUrl}/characters`)
    .then((res) => {
      dispatch({
        type: GET_CHARACTERS,
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
