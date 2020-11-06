import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./Header/Header";
import AdoptionPage from "./AdoptionPage/AdoptionPage";
import LandingPage from "./LandingPage/LandingPage";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Switch>
            <Route path="/adoption-page" component={AdoptionPage} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </main>
      </div>
    );
  }
}