import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

const intialState = {};

const middleware = [thunk];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const store = createStore(rootReducer, intialState, enhancer);

export default store;
