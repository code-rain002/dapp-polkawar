import { combineReducers } from 'redux';
import itemReducers from './itemReducers';
import characterReducers from './characterReducers';
import userReducers from './userReducers';

export default combineReducers({
  items: itemReducers,
  characters: characterReducers,
  user: userReducers,
});
