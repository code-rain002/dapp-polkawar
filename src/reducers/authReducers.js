import { GET_CURRENT_USER } from '../actions/types';

const initalState = {
  authenticated: false,
  user: null,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        authenticated: !state.authenticated,
        user: action.payload,
      };
    default:
      return state;
  }
}
