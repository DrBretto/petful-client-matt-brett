import React, { Component } from "react";
import Users from "../Users/Users";
import Adopt from "../Adopt/Adopt";
import petsApiService from "../services/pets-service";
import dogsApiService from "../services/dogs-service";
import catsApiService from "../services/cats-service";
import usersApiService from "../services/users-service";

export default class AdoptionPage extends Component {
  state = {
    cat: {},
    dog: {},
    users: [],
    currentUser: "Nobody",
    nextInLine: "",
    timeToPick: 5,
  };

  componentDidMount() {
    dogsApiService
      .getDogs()
      .then((res) => {
        this.setState({
          dog: res.data,
        });
      })
      .catch((res) => this.setState({ error: res.message }));

    catsApiService
      .getCats()
      .then((res) => {
        this.setState({
          cat: res.data,
        });
      })
      .catch((res) => this.setState({ error: res.message }));
    this.populateList();

    this.interval = setInterval(() => {
      this.handleInterval();
    }, 1000);
  }

  deleteDog = () => {
    petsApiService.deleteDog();
    let updatedDogs = [...this.state.dogs];
    updatedDogs.shift();
    this.updateUser();
    this.setState({
      dogs: updatedDogs,
    });
  };

  deleteCat = () => {
    petsApiService.deleteCat();
    let updatedCats = [...this.state.cats];
    updatedCats.shift();
    this.updateUser();
    this.setState({
      cats: updatedCats,
    });
  };

  adoptDog = (option) => {
    if (option === "both") {
      this.adoptPet("both");
    } else {
      this.adoptPet("dogs");
    }
  };

  adoptCat = (option) => {
    if (option === "both") {
      this.adoptPet("both");
    } else {
      this.adoptPet("cats");
    }
  };

  populateList() {
    let users = [];
    usersApiService.getUsers().then((res) => {
      if (res.hasOwnProperty("nextinline")) {
        users[0] = res.nextinline.data;
        if (!!res.nextinline.hasOwnProperty("next")) {
          users[1] = res.nextinline.next.data;
          if (!!res.nextinline.next.hasOwnProperty("next")) {
            users[2] = res.nextinline.next.next.data;
            if (!!res.nextinline.next.next.hasOwnProperty("next")) {
              users[3] = res.nextinline.next.next.next.data;
              if (!!res.nextinline.next.next.next.hasOwnProperty("next")) {
                users[4] = res.nextinline.next.next.next.next.data;
              }
            }
          }
        }

        this.setState({
          currentUser: users[0],
          users: users,
        });
      }
    });

    console.log("AdoptionPage -> populateList -> users", users);
  }

  handleAddPerson = (e) => {
    e.preventDefault();
    const { name } = e.target;
    usersApiService.postUsers(name.value).then((res) => {
      this.populateList();
    });
  };

  handleInterval() {
    let users = this.state.users;
    let timer = this.state.timeToPick;
    if (timer <= 0) {
      if (users.length < 5) {
        const randomUsers = [
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

        let randomPerson =
          randomUsers[Math.floor(Math.random() * (randomUsers.length - 1))];

        usersApiService.postUsers(randomPerson).then((res) => {
          this.populateList();
        });
        this.setState({
          timeToPick: 5,
        });
      } else {
        usersApiService.deleteUser().then((res) => {
          console.log("delete service run");
        });
      }
    } else {
      this.setState({
        timeToPick: timer - 1,
      });
      this.populateList();
    }
  }

  render() {
    const { cat, dog, users, error, currentUser, timeToPick } = this.state;

    return (
      <div>
        <section className="users light window">
          <div className="userInput">
            <h2> People in line to adopt {"--->"}</h2>
            <form className="nameForm" onSubmit={this.handleAddPerson}>
              <label htmlFor="adoptForm">Name</label>
              <input name="name" type="text" />
              <button type="submit">Get In Line</button>
            </form>
          </div>
          <Users users={users} />
        </section>

        <div className="adopt window">
          <h2>
            {currentUser.name} has {timeToPick} seconds to pick
          </h2>
          <section className="petInfo light window">
            <h2>Dogs</h2>
            <Adopt
              dog={dog}
              adopt={this.deleteDog}
              adopt={this.adoptDog}
              user={users}
              error={error}
            />
          </section>

          <section className="petInfo light window">
            <h2>Cats</h2>
            <Adopt
              cat={cat}
              adopt={this.deleteCat}
              adopt={this.adoptCat}
              user={users}
              error={error}
            />
          </section>
        </div>
      </div>
    );
  }
}
