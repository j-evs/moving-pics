import React from "react";
import { Provider } from "react-redux";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import Router from "./Router";

import "./App.css";

const engine = new Styletron();

const App = props => {
  const { store } = props;

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Provider store={store}>
          <Router />
        </Provider>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
