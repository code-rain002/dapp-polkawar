import axios from 'axios';
import baseUrl from '../actions/baseUrl';
import {
  GET_ITEMS_CATEGORY,
  GET_ITEMS,
  GET_ITEM,
  GET_FLASH_ITEMS,
  ADD_USER_ITEM,
  GET_USER_ITEMS,
  UPDATE_USER_ITEM_OWNER,
  GET_ERRORS,
} from './types';

//get item details based on ID
export const getItem =
  (id = 1000) =>
  (dispatch) => {
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

//get items based on category and pagination
export const getItems =
  (category, pageNo, pageSize = 8) =>
  (dispatch) => {
    let smallCategory = category.toLowerCase();

    let url = '';
    if (smallCategory === 'all') {
      url = `${baseUrl}/items/${pageNo}/${pageSize}`;
    } else {
      url = `${baseUrl}/items/${smallCategory}`;
    }

    axios
      .get(url)
      .then((res) => {
        let response = {
          category: smallCategory,
          data: res.data,
        };
        dispatch({
          type: GET_ITEMS,
          payload: response,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response,
        });
      });
  };

//GET all item categories
export const getCategories = () => (dispatch) => {
  axios
    .get(`${baseUrl}/categories`)
    .then((res) => {
      dispatch({
        type: GET_ITEMS_CATEGORY,
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

//Get Flash Items
export const getFlashItems = () => (dispatch) => {
  let url = `${baseUrl}/flashsale`;
  console.log('Hitting');
  axios
    .get(url)
    .then((res) => {
      dispatch({
        type: GET_FLASH_ITEMS,
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

//GET User Item
//Getting NFTs from userItem Collection
export const getUserItems = (userAddress) => (dispatch) => {
  let url = `${baseUrl}/useritems/${userAddress}`;

  console.log(url);
  console.log('getUserItems');
  axios
    .get(url)
    .then((res) => {
      dispatch({
        type: GET_USER_ITEMS,
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

//POST User Item
// Adding entry into userItem Collection
export const addUserItem = (useritemData) => (dispatch) => {
  let url = `${baseUrl}/useritem`;

  console.log('addUserItem');
  axios
    .post(url, useritemData)
    .then((res) => {
      dispatch({
        type: ADD_USER_ITEM,
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
};

//Update User Item
// Adding entry into userItem Collection
export const updateUserItemOwner = (itemIdFromCollection) => (dispatch) => {
  let url = `${baseUrl}/useritem/${itemIdFromCollection}`;

  console.log(url);
  console.log(itemIdFromCollection);
  const article = { title: 'React PUT Request Example' };
  let data = axios
    .put(url, article)
    .then((res) => {
      dispatch({
        type: UPDATE_USER_ITEM_OWNER,
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
  return data;
};
