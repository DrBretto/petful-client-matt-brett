import React, { Component } from "react";

export default class Adopt extends Component {
  state = {
    index: 0,
  };

  next = () => {
    this.setState({
      index: this.state.index + 1,
    });
  };

  back = () => {
    this.setState({
      index: this.state.index - 1,
    });
  };

  render() {
    const { index } = this.state;
    let dog = this.props.dog;
    let cat = this.props.cat;
    let adopt = this.props.adopt;
    let user = this.props.user;
    let error = this.props.error;

    if (cat) {
      return (
        <div className="pet cat">
          <img width="200px" src={cat.imageURL} alt={cat.imageDescription} />
          <p> Description: {cat.imageDescription}</p>
          <p> Name: {cat.name}</p>
          <p> Sex: {cat.sex}</p>
          <p> Breed: {cat.breed}</p>
          <p> Age: {cat.age}</p>
          <p> Story: {cat.story}</p>
        </div>
      );
    } else if (dog) {
      return (
        <div className="pet dog">
          <img width="200px" src={dog.imageURL} alt={dog.imageDescription} />
          <p> Description: {dog.imageDescription}</p>
          <p> Name: {dog.name}</p>
          <p> Sex: {dog.sex}</p>
          <p> Breed: {dog.breed}</p>
          <p> Age: {dog.age}</p>
          <p> Story: {dog.story}</p>
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
