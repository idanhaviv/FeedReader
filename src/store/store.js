import { createStore, compose } from "redux";
import feedReducer from "./reducers/feedReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(feedReducer, composeEnhancers());
