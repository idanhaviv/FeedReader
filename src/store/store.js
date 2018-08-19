import { createStore, compose } from "redux";
import feedReducer from "./reducers/feedReducer";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(feedReducer, persistedState, composeEnhancers());
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);
export default store;
