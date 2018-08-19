import throttle from "lodash/throttle";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import feedReducer from "./reducers/feedReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  feedReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
