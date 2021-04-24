import { GET_ITEMS_CATEGORY, GET_ITEMS, GET_ITEM } from '../actions/types';

const initalState = {
  categories: null,
  item: null,
  items: null,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_ITEMS_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };

    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case GET_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
