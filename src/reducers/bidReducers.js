import { GET_BID_ITEM_BY_ID } from '../actions/types';

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
		default:
			return state;
	}
}
