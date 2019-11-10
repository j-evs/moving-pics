import React from "react";
import ReactDOM from "react-dom";
import App from "./view/App";
import createStore from "./state/store";
import * as container from "./container";

const store = createStore({
  container
});

ReactDOM.render(<App store={store} />, document.getElementById("root"));
