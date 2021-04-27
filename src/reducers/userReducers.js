import { GET_USER } from '../actions/types';

const initalState = {
  user: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
