import { combineReducers } from "redux";
import authReducers from "./authReducers";
import characterReducers from "./characterReducers";
import itemReducers from "./itemReducers";
import bidReducers from "./bidReducers";

export default combineReducers({
  auth: authReducers,
  characters: characterReducers,
  items: itemReducers,
  bids: bidReducers,
});
