import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../Header";
import LandingPage from "../LandingPage";
import AdoptionPage from "../AdoptionPage";
import { BrowserRouter } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Header></Header>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/adopt" component={AdoptionPage} />
          </Switch>
          
        </BrowserRouter>
      </main>
    );
  }
}

/*

  const pet = {
    description: 'Nice Doggy!',
    age: 5,
    breed: 'German Shepard',
    gender: 'Male',
    imageURL: 'http://fakeimg.pl/300x300?text=Doggy&font=lobster' ,
    story: 'He\'s a good boy!',
    name: 'Toby'
  }


}

export default Root
*/
