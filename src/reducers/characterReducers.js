import {
  GET_CHARACTERS,
  GET_TOP100_CHARACTERS,
  GET_USER_CHARACTERS,
} from "../actions/types";

const initalState = {
  characters: [],
  topcharacters: [],
  usercharacter: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };
    case GET_TOP100_CHARACTERS:
      return {
        ...state,
        topcharacters: action.payload,
      };

    case GET_USER_CHARACTERS:
      return {
        ...state,
        usercharacter: action.payload,
      };
    default:
      return state;
  }
}
