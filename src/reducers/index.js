import { combineReducers } from 'redux';
import itemReducers from './itemReducers';
import characterReducers from './characterReducers';
import userReducers from './userReducers';
import authReducers from './authReducers';

export default combineReducers({
  auth: authReducers,
  user: userReducers,
  characters: characterReducers,
  items: itemReducers,
});
