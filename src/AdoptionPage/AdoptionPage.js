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
    users: [
      "Cheddar Bob",
      "Billy Bob",
      "Bobcat Goldthwait",
      "Uncle Bob",
      "What about Bob",
    ],
    currentUser: "",
    nextInLine: "",
  };

  componentDidMount() {
    dogsApiService
      .getDogs()
      .then((res) => {
        console.log("AdoptionPage -> componentDidMount -> res", res);
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

    // usersApiService.getUsers().then((res) => {
    //   this.setState({
    //     users: res,
    //   });
    // });

    this.interval = setInterval(() => {
      this.handleInterval();
    }, 5000);
  }

  updateUser() {
    usersApiService.postUsers().then((res) => {
      this.setState({
        users: res,
        user: res[0].name,
      });
    });
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

  handleAddPerson = (e) => {
    e.preventDefault();
    const { name } = e.target;
    usersApiService.postUsers(name.value).then((res) => {
      console.log(res);
      this.setState({
        currentUser: name.value,
      });
    });
    console.log(this.state.currentUser);
  };

  handleInterval() {
    const users = this.state.users;
    const cats = this.state.cats;
    const dogs = this.state.dogs;

    const currentUser = this.state.currentUser;
    let nextInLine = this.state.nextInLine;

    if (nextInLine === currentUser) {
      if (users.length < 4) {
        const random = [
          "Cheddar Bob",
          "Billy Bob",
          "Bobcat Goldthwait",
          "Uncle Bob",
          "What about Bob",
        ];
        let randomPerson = random[Math.floor(Math.random() * 4)];
        usersApiService.postUsers(randomPerson).then(() => {
          users.push(randomPerson);
          this.setState({ users: users });
        });
      }
    } else if (users.length > 0) {
      const petType = users.length % 2 === 0 ? "cats" : "dogs";
      petsApiService.deletePet(petType).then(() => {
        if (petType === "cats") {
          cats.shift();
        } else {
          dogs.shift();
        }
        users.shift();

        this.setState({
          users: users,
          cats: cats,
          dogs: dogs,
          nextInLine: users[0],
        });
      });
    }
  }

  render() {
    const { cat, dog, users, error } = this.state;

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
