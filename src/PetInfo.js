import React, { Component } from "react";

export default class PetInfo extends Component {
  render() {
    const {
      age,
      breed,
      description,
      gender,
      imageURL,
      name,
      story,
    } = this.props.pet;
    return (
      <section>
       <img className="petImage" src={imageURL} alt="pet pic" />
       <section className="petInfo">
          <div className="petName">Name: {name}</div>
          <div className="petAge">Age: {age}</div>
          <div className="petGender">Gender: {gender}</div>
          <div className="petBreed">Breed: {breed}</div>
          <div className="petDesc">Description: {description}</div>
          <div className="petStory">Story: {story}</div>
        </section>
      </section>
    );
  }
}
