import React, { Component } from "react";
import People from "../People/People";
import Pet from "../Pet/Pet";
import Adopted from "../Adopted/Adopted";
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
    yourTurn: false,
    adopted: null,
  };

  intervalId;

  componentDidMount() {
    this.update();
  }

  update = () => {
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
        nextInLine: res[1],
      });
    });
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  adoptCat = () => {
    const adopted = this.state.cats[0];

    peopleApiService.deletePeople().then((res) => {
      this.setState({
        people: res,
        nextInLine: res[1],
      });
    });
    petsApiService.deletePet("cat").then(
      this.setState({
        currentUser: "",
        added: false,
        yourTurn: false,
        adopted: adopted,
      })
    );
  };

  adoptDog = () => {
    const adopted = this.state.dogs[0];
    peopleApiService.deletePeople().then((res) => {
      this.setState({
        people: res,
        nextInLine: res[1],
      });
    });
    petsApiService.deletePet("dog").then(
      this.setState({
        currentUser: "",
        added: false,
        yourTurn: false,
        adopted: adopted,
      })
    );
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
        nextInLine: res[1],
        currentPerson: name.value,
        added: true,
      });

      this.intervalId = setInterval(() => {
        this.handleDemo();
      }, 1000);
    });
  };

  handleDemo() {
    let { people, currentPerson } = this.state;

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
      let pet = Math.floor(Math.random() * 2) === 0 ? "dog" : "cat";
      console.log("AdoptionPage -> handleDemo -> pet", pet);
      petsApiService.deletePet(pet);

      peopleApiService.postPeople(random[i]).then((res) => {
        this.setState({
          nextInLine: res[1],
          people: res,
          added: true,
        });
      });
    }

    peopleApiService.deletePeople().then((res) => {
      this.setState({
        nextInLine: res[1],
        people: res,
      });
    });

    if (this.state.nextInLine === currentPerson && this.state.added === true) {
      this.setState({
        yourTurn: true,
      });
      clearInterval(this.intervalId);
    }
    this.update();
  }

  closeWindow = () => {
    this.setState({
      adopted: null,
    });
  };

  render() {
    const {
      cats,
      dogs,
      people,
      error,
      currentPerson,
      yourTurn,
      adopted,
    } = this.state;

    return (
      <div className="mainContainer">
        <div className="users">
          <ol className="usersList">
            <People people={people} />
          </ol>
          <form className="userInput" onSubmit={this.handleAddPerson}>
            <label htmlFor="adoptForm">Name</label>
            <input name="name" type="text" />
            <button type="submit">Get In Line</button>
          </form>
        </div>
        <div>
          {!!adopted && (
            <div className="adoptedWindow orange window">
              <Adopted
                pet={adopted}
                func={this.update}
                close={this.closeWindow}
              />
            </div>
          )}
          {yourTurn && (
            <div className="centerImage">{currentPerson}'s turn</div>
          )}
          <section>
            <div className="white petWindow">
              <h2>Dogs</h2>
              {dogs.length > 0 ? (
                <Pet
                  pet={dogs[0]}
                  adopt={this.adoptDog}
                  error={error}
                  yourTurn={yourTurn}
                />
              ) : (
                <h2>No dogs to adopt</h2>
              )}
            </div>
          </section>
          <section>
            <div className="white petWindow">
              <h2>Cats</h2>
              {cats.length > 0 ? (
                <Pet
                  pet={cats[0]}
                  adopt={this.adoptCat}
                  error={error}
                  yourTurn={yourTurn}
                />
              ) : (
                <h2>No cats to adopt</h2>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
