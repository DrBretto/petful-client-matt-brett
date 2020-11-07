import React, { Component } from "react";
import People from "../People/People";
import Adopt from "../Adopt/Adopt";
import petsApiService from "../Services/pets-service";
import peopleApiService from "../Services/people-service";

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
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  adoptCat = () => {
    let cats = this.state.cats;
    petsApiService.deletePets("cat").then((res) => {
      console.log("AdoptionPage -> res", res);
      cats = res;
    });
    const people = this.state.people;
    cats.shift();
    people.shift();
    this.setState({
      people: people,
      cats: cats,
      confirm: true,
      nextInLine: people[0],
      currentUser: "",
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
      added: false,
    });
  };

  handleAddPerson = (e) => {
    e.preventDefault();
    const { name } = e.target;

    if (name.value === "") {
      alert("Name must be valid");
      return null;
    }

    if (this.state.added === true) {
      alert("Name already in queue");
    }

    peopleApiService.postPeople(name.value).then((res) => {

      this.setState({
        people: res,
        currentPerson: name.value,
        added: true,
      });
      console.log("adding person to list:", name.value);

      setInterval(() => {
        this.handleDemo();
      }, 5000);
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
    if (people.length <= 5) {
      const random = [
        "Peter Parker",
        "Tony Stark",
        "Natasha Rominof",
        "Billy Baxton",
        "Melvin White",
        "Christen Coggin",
        "Buddy Blakely",
        "Britany Bowie",
        "Rashad Roa",
        "Teresia Tenenbaum",
        "Loma Lisk",
        "Emilee Eslick",
        "Tamera Trollinger",
        "Ethelene Eis",
        "Janita Jester",
        "Harris Hagedorn",
        "Verona Vina",
        "Lenita Levitsky",
        "Lida Lindgren",
        "Paola Paquin",
        "Dianna Doman",
        "Ashanti Amo",
        "Filiberto Fortin",
        "Reagan Reichenbach",
        "Dacia Denley",
      ];
      let i = Math.floor(Math.random() * (random.length - 1));

      peopleApiService.postPeople(random[i]).then((res) => {
        this.setState({
          people: res,
          added: true,
        });
      });
    }

    if (nextInLine !== currentPerson && this.state.added === true) {
      const pet = people.length % 2 === 0 ? "cats" : "dogs";
      petsApiService.deletePets(pet).then((res) => {
        this.setState({
          dogs: pet.dogs,
          cats: pet.cats
        })
      });


      peopleApiService.deletePeople().then((res) => {
        if (pet === "cats") {
          cats.shift();
        }
        if (pet === "dogs") {
          dogs.shift();
        }
        people.shift();
        this.setState({
          people: res,
          cats: cats,
          dogs: dogs,
          nextInLine: people[0],
        });
      });
    } 
    else if (nextInLine !== currentPerson && this.state.added === true){
      console.log("your turn detected");
      clearInterval(this.intervalId);
    }
    else {
      peopleApiService.deletePeople().then((res) => {
        this.setState({
          people: res,
        });
      });
    }
  }

  render() {
    const { cats, dogs, nextInLine, people, error, currentPerson } = this.state;
    console.log("State Changed: ", this.state);

    if (cats) {
      return (
        <div className="mainContainer">
          <div className="users">
            <ol className="usersList">
              <People people={people} />
            </ol>
            {/* {!this.state.added && ( */}
            <form className="userInput" onSubmit={this.handleAddPerson}>
              <label htmlFor="adoptForm">Name</label>
              <input name="name" type="text" />
              <button type="submit">Get In Line</button>
            </form>
            {/* )} */}
          </div>
          <div>
            <section>
              <div className="white">
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
              </div>
            </section>
            <section>
              <div className="white">
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
              </div>
            </section>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
