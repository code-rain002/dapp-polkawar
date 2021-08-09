import { GET_CHARACTERS, GET_USER_CHARACTERS } from "../actions/types";

const initalState = {
  characters: [],
  usercharacters: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };
    case GET_USER_CHARACTERS:
      return {
        ...state,
        usercharacters: action.payload,
      };
    default:
      return state;
  }
}
