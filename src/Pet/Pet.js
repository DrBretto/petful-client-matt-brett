import React, { Component } from "react";

export default class Adopt extends Component {
  render() {
    const { yourTurn, pet, error } = this.props;
    if (!!error) {
      return (
        <div className="adopt">
          <div className="centerImage">
            <img src={pet.imageURL} alt={pet.imageDescription} />
          </div>
          {yourTurn && (
            <button onClick={() => this.props.adopt()}>Adopt Me!</button>
          )}
          <p> Name: {pet.name}</p>
          <p> Age: {pet.age}</p>
          <p> Description: {pet.description}</p>
          <p> Sex: {pet.gender}</p>
          <p> Breed: {pet.breed}</p>
          <p> Story: {pet.story}</p>
        </div>
      );
    } else {
      return (
        <div>
          {error && (
            <h2>Sorry, all pets have been adopted, please come back later!</h2>
          )}
        </div>
      );
    }
  }
}
