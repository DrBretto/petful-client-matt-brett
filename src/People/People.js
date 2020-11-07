import React, { Component } from "react";

export default class People extends Component {
  renderPeople() {
    const people = [...this.props.people];
    console.log("People -> renderPeople -> people", people)
    if (people.length < 5) {
      for (let i = people.length; i < 5; i++) {
        people[i] = "  -----  ";
      }
    }
    if (people.length >= 5) {
      people.slice(4);
    }

    console.log("People -> renderPeople -> people", people)

    const peopleList = people.map((person, i) => {
      return <li key={i}>{person}</li>;
    });
    return peopleList;
  }

  render() {
    if (this.props.people.length > 0) {
      return (
        <section>
          <h2>Adoption Line</h2>
          <div>{this.renderPeople()}</div>
        </section>
      );
    } else {
      return <></>;
    }
  }
}
