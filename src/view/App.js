import React from "react";
import { Provider } from "react-redux";

import Router from "./Router";

const App = props => {
  const { store } = props;

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
