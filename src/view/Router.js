import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Feed from "./feed/Feed";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Feed} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default Router;
