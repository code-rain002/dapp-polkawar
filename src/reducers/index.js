import { combineReducers } from 'redux';
import itemReducers from './itemReducers';
import characterReducers from './characterReducers';

export default combineReducers({
  items: itemReducers,
  characters: characterReducers,
});
