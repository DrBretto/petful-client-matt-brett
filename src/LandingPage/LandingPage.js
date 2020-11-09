import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";
import catanddog from "../images/catanddog.jpg";

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="landingpageBody">
          <p>Welcome to FIFO Animal shelter!</p>
          <p>
            Our adoption process is pretty simple: Click on the "Adopt Now"
            button to check out the next dog and cat waiting to be adopted. When
            you're ready, jump in line. When your turn is up, you can adopt
            either the next cat or dog available.
          </p>
          <img width="100%" src={catanddog} alt="cat and dog" />
          <div className="button">
            <Link to="/adoption-page">
              <button>Adopt Now!</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
