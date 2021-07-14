import axios from 'axios';
import baseUrl from '../actions/baseUrl';
import { GET_BID_ITEM_BY_ID, CREATE_BID_BY_ID, GET_ERRORS } from './types';

//GET BID ITEM BY ID
export const getBidItem = (id) => (dispatch) => {
	axios
		.get(`${baseUrl}/bid/${id}`)
		.then((res) => {
			dispatch({
				type: GET_BID_ITEM_BY_ID,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Network Error',
			});
		});
};

//POST A NEW BID BY ID
export const createNewBid = (itemId, userAddress, bidAmount) => (dispatch) => {
	let bidData = {
		address: userAddress,
		amount: bidAmount,
	};
	axios
		.post(`${baseUrl}/bid/${itemId}`, bidData)
		.then((res) => {
			dispatch({
				type: CREATE_BID_BY_ID,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Network Error!',
			});
		});
};
