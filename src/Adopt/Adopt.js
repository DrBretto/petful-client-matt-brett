import React, { Component } from "react";
import './adopt.css'

export default class Adopt extends Component {
  constructor(props) {
    super(props);
    this.adoptDog = this.handleAdoptDog.bind(this);
    this.adoptCat = this.handleAdoptCat.bind(this);
  }
  handleAdoptDog() {
    this.props.adoptDog();
    this.setState({
      confirm:false,
      added:false,
    })
  }
  handleAdoptCat() {
    this.props.adoptCat();
    this.setState({
      confirm:false,
      added:false
    })
  }
  render() {
    const dogs = this.props.dogs;
    const cats = this.props.cats;
    let currentPerson = this.props.currentPerson;
    let error = this.props.error;
    let nextInLine = this.props.nextInLine;
    if (cats) {
      return (
        <div className="adopt">
              <div className="centerImage"><img src={cats.imageURL} alt={cats.imageDescription} /></div>
              {nextInLine === currentPerson && (
                <button onClick={() => this.handleAdoptCat()}>Adopt Me!</button>
              )}
              <p> Name: {cats.name}</p>
              <p> Age: {cats.age}</p>
              <p> Description: {cats.description}</p>
              <p> Sex: {cats.gender}</p>
              <p> Breed: {cats.breed}</p>
              <p> Story: {cats.story}</p>
              
        </div>
      );
    } else if (dogs) {
      return (
        <div className="adopt">
          {dogs ? (
            <>
              <div className="centerImage"><img src={dogs.imageURL} alt={dogs.imageDescription} /></div>
              {nextInLine === currentPerson && (
                <button onClick={() => this.handleAdoptDog()}>Adopt Me!</button>
              )}
              <p> Name: {dogs.name}</p>
              <p> Age: {dogs.age}</p>
              <p> Description: {dogs.description}</p>
              <p> Sex: {dogs.gender}</p>
              <p> Breed: {dogs.breed}</p>
              <p> Story: {dogs.story}</p>
              
            </>
          ) : (
            <h1>No dogs to adopt</h1>
          )}
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