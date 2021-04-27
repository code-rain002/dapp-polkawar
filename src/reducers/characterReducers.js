import { GET_CHARACTERS } from '../actions/types';

const initalState = {
  characters: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };
    default:
      return state;
  }
}
