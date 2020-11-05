import React, { Component } from "react";

export default class LandingPage extends Component {
  render() {
    return (
      <div>
* I see a description of the adoption process.
* I see a meaningful picture related to the description.
* I see a button for starting the adoption process.

* An image of the pet;
* A physical description of the pet;
* The pet's name, gender, age, and breed.
* A story of the pet's journey to the shelter

When I visit the adoption page, I can only see the 
pet that is next in line to be adopted.

When I visit the adoption page:

* I can see a list of other people currently in line.
* I can submit my name and be added to the end of the line.
* When I am not at the beginning of the line, I cannot see an 
option to adopt a pet.
* For demo purposes: Once I join the line, I can see other pets
being adopted until I am at the front of the line.
* Every five seconds, the user at the front of the line should 
be removed from the line and one of the pets up for adoption should 
disappear.
* When I am at the front of the line, a new user should be added to 
the line behind me every five seconds until there are a total of five 
users in line.


      </div>
    );
  }
}
