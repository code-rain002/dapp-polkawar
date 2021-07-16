import { GET_BID_ITEM_BY_ID, CREATE_BID_BY_ID, GET_ALL_BID_ITEMS } from '../actions/types';

const initalState = {
	item: null,
	items: [],
};

export default function Bids(state = initalState, action) {
	switch (action.type) {
		case GET_BID_ITEM_BY_ID:
			return {
				...state,
				item: action.payload,
			};
		case CREATE_BID_BY_ID:
			return {
				...state,
				item: action.payload,
			};
		case GET_ALL_BID_ITEMS:
			return {
				...state,
				items: action.payload,
			};

		default:
			return state;
	}
}
