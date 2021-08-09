import {
  GET_ITEMS_CATEGORY,
  GET_ITEMS,
  GET_ITEM,
  GET_FLASH_ITEMS,
  ADD_USER_ITEM,
  GET_USER_ITEMS,
  UPDATE_USER_ITEM_OWNER,
} from "../actions/types";

const initalState = {
  categories: [],
  item: null,
  items: [],
  flash: [],
  useritems: [],
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
        items:
          action.payload.category === "all"
            ? action.payload.pageNo === 0
              ? [...action.payload.data]
              : [...state.items, ...action.payload.data]
            : action.payload.data,
      };
    case GET_FLASH_ITEMS:
      return {
        ...state,
        flash: action.payload,
      };
    case GET_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    case ADD_USER_ITEM:
      return {
        ...state,
      };
    case GET_USER_ITEMS:
      return {
        ...state,
        useritems: action.payload,
      };
    case UPDATE_USER_ITEM_OWNER:
      //Delete that from userItems
      return {
        ...state,
      };
    default:
      return state;
  }
}
