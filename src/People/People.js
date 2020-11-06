import React, { Component } from "react";

export default class People extends Component {
  renderPeople() {
    const peopleList = this.props.people.map((person, i) => {
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