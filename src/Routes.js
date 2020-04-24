import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home"
import Questions from "./pages/Questions";
import Jokes from "./pages/Jokes"
import history from './history';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/questions" component={Questions} />
          <Route path="/jokes" component={Jokes} />
        </Switch>
      </Router>
    )
  }
}
