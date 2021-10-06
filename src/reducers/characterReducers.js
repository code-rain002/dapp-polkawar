import {
  GET_CHARACTERS,
  GET_TOP100_CHARACTERS,
  GET_USER_CHARACTERS,
  GET_CHARACTER_RANK
} from "../actions/types";

const initalState = {
  characters: [],
  topcharacters: [],
  usercharacter: [],
  rank: null
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
        topcharacters: [...state.topcharacters, ...action.payload],
      };
    case GET_CHARACTER_RANK:
      return {
        ...state,
        rank: action.payload.rank,
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
