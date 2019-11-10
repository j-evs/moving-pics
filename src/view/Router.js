import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Feed from "./feed/Feed";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Feed {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

// url helpers
export const getParam = (location, paramName) => {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(paramName) || "";
};

const setParam = param => {
  const searchParams = new URLSearchParams();
  const paramName = Object.keys(param)[0];
  const paramValue = Object.values(param)[0];

  searchParams.set(paramName, paramValue);
  return searchParams.toString();
};

export const updateURL = (history, param) => {
  const url = setParam(param);
  history.push(`?${url}`);
};

export default Router;
