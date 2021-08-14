import { GET_CURRENT_USER, REMOVE_CURRENT_USER } from "../actions/types";

const initalState = {
  authenticated: false,
  user: null,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        authenticated: false,
        user: null,
      };

    default:
      return state;
  }
}
