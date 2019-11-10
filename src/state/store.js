import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import thunk from "redux-thunk";
import { feedReducer as feed } from "./feed";

const reducer = combineReducers({
  feed
});

export default ({ container }) =>
  createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(container)))
  );
