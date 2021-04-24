import axios from 'axios';
import baseUrl from '../actions/baseUrl';
import { GET_ITEMS_CATEGORY, GET_ITEMS, GET_ITEM, GET_ERRORS } from './types';

//get item details based on ID
export const getItem = (id = 1000) => (dispatch) => {
  axios
    .get(`${baseUrl}/item/${id}`)
    .then((res) => {
      dispatch({
        type: GET_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//get items based on category
export const getItems = (category = 'All') => (dispatch) => {
  axios
    .get(`${baseUrl}/items/${category}`)
    .then((res) => {
      dispatch({
        type: GET_ITEMS,
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
