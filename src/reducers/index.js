import { combineReducers } from 'redux';
import authReducers from './authReducers';
import userReducers from './userReducers';
import characterReducers from './characterReducers';
import itemReducers from './itemReducers';
import bidReducers from './bidReducers';

export default combineReducers({
	auth: authReducers,
	user: userReducers,
	characters: characterReducers,
	items: itemReducers,
	bids: bidReducers,
});
