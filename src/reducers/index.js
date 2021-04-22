import { combineReducers } from 'redux';
import itemReducers from './itemReducers';

export default combineReducers({
  items: itemReducers,
});
