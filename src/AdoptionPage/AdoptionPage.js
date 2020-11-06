import React, { Component } from "react";
//import "./adoptionpage.css";
import People from "../People/People";
import Adopt from "../Adopt/Adopt";
import petsApiService from "../Services/pets-service";
import peopleApiService from "../Services/people-service";
//import Trigger from "../TakeHome/Trigger";
//import TakeHome from "../TakeHome/TakeHome";

export default class AdoptionPage extends Component {
  state = {
    cats: [],
    dogs: [],
    people: [],
    confirm: false,
    currentPerson: "",
    nextInLine: "",
    added: false,
    error: {},
  };

  componentDidMount() {
    petsApiService
      .getPets()
      .then((res) => {
        this.setState({
          cats: res.cats,
          dogs: res.dogs,
        });
      })
      .catch((res) => this.setState({ error: res.message }));

    peopleApiService.getPeople().then((res) => {
      this.setState({
        people: res,
        nextInLine: res[0],
      });
    });
    setInterval(() => {
      this.handleDemo();
    }, 5000);
  }

  adoptCat = () => {
    petsApiService.deletePets("cat");
    const people = this.state.people;
    const cats = this.state.cats;
    cats.shift();
    people.shift();
    this.setState({
      people: people,
      cats: cats,
      confirm: true,
      nextInLine: people[0],
      currentUser: "",
      added:false,
    });
  };
  adoptDog = () => {
    petsApiService.deletePets("dog");
    const people = this.state.people;
    const dogs = this.state.dogs;
    dogs.shift();
    people.shift();
    this.setState({
      people: people,
      dogs: dogs,
      confirm: true,
      nextInLine: people[0],
      currentUser: "",
      added:false,
    });
  };
  handleAddPerson = (e) => {
    e.preventDefault();
    const { name } = e.target;
      if(name.value === '') {
         alert("Name must be valid")
         return null
      }
    const people = this.state.people;
    peopleApiService.postPeople(name.value).then(() => {
      people.push(name.value);
      this.setState({
        people: people,
        currentPerson: name.value,
        added: true,
      });
    });
  };

  handleDemo() {
    let people = this.state.people;
    let cats = this.state.cats;
    let dogs = this.state.dogs;
    const currentPerson = this.state.currentPerson;
    let nextInLine = this.state.nextInLine;
    if (people.length === 0) {
      clearInterval(this.intervalId);
    }
    if (nextInLine === currentPerson) {
      if (people.length < 5) {
        const random = [
          "Cheddar Bob",
          "Billy Bob",
          "Bobcat Goldthwait",
          "Uncle Bob",
          "What about Bob",
        ];
        let i = Math.floor(Math.random() * 5);
        peopleApiService.postPeople(random[i]).then(() => {
          people.push(random[i]);
          this.setState({ people: people });
        });
      }
    } else if (nextInLine !== currentPerson && this.state.added === true) {
      const pet = people.length % 2 === 0 ? "cats" : "dogs";
      petsApiService.deletePets(pet);
      peopleApiService.deletePeople().then(() => {
        if (pet === "cats") {
          cats.shift();
        }
        if (pet === "dogs") {
          dogs.shift();
        }
        people.shift();
        this.setState({
          people: people,
          cats: cats,
          dogs: dogs,
          nextInLine: people[0],
        });
      });
    }
  }

  render() {
    const { cats, dogs, nextInLine, people, error, currentPerson } = this.state;
    console.log(cats);
    if (cats) {
      return (
        <div className="mainContainer">
          <ol>
            <People people={people} />
          </ol>
          {!this.state.added && (
            <form className="nameForm" onSubmit={this.handleAddPerson}>
              <label htmlFor="adoptForm">Name</label>
              <input name="name" type="text" />
              <button type="submit">Get In Line</button>
            </form>
          )}
          <div>
            <section>
              <h2>Dogs</h2>
              {dogs.length > 0 ? (
                <Adopt
                  dogs={dogs[0]}
                  adoptDog={this.adoptDog}
                  error={error}
                  currentPerson={currentPerson}
                  nextInLine={nextInLine}
                />
              ) : (
                <h2>No dogs to adopt</h2>
              )}
            </section>
            <section>
              <h2>Cats</h2>
              {cats.length > 0 ? (
                <Adopt
                  cats={cats[0]}
                  adoptCat={this.adoptCat}
                  error={error}
                  currentPerson={currentPerson}
                  nextInLine={nextInLine}
                />
              ) : (
                <h2>No cats to adopt</h2>
              )}
            </section>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}