import axios from 'axios';
import baseUrl from '../actions/baseUrl';
import { GET_BID_ITEM_BY_ID, GET_ERRORS } from './types';

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
				payload: err.response.data,
			});
		});
};
