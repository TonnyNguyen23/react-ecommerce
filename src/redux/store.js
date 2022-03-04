import rootReducers from "./reducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducers, composeWithDevTools());

export default store;
