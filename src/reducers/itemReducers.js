import { GET_ITEMS_CATEGORY, GET_ITEMS, GET_ITEM, GET__FLASH_ITEMS } from '../actions/types';

const initalState = {
  categories: [],
  item: null,
  items: [],
  flash: [],
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
        items: action.payload.category === 'all' ? [...state.items, ...action.payload.data] : action.payload.data,
      };
    case GET__FLASH_ITEMS:
      return {
        ...state,
        flash: action.payload.data,
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
