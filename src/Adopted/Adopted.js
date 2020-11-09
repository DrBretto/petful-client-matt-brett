import React, { Component } from "react";

export default class Adopt extends Component {
  componentDidMount() {
    this.props.func();
  }

  render() {
    const { pet } = this.props;
    return (
      <div className="adopt">
        <h2>Congratulations! Meet your new best friend, {pet.name}</h2>
        <div className="centerImage">
          <img src={pet.imageURL} alt={pet.imageDescription} />
        </div>
        <p> Name: {pet.name}</p>
        <p> Age: {pet.age}</p>
        <p> Description: {pet.description}</p>
        <p> Sex: {pet.gender}</p>
        <p> Breed: {pet.breed}</p>
        <p> Story: {pet.story}</p>
        <button onClick={this.props.close}>close</button> 
      </div>
    );
  }
}
