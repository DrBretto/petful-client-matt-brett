import React, { Component } from "react";
import PetInfo from "./PetInfo";
import { Route, Switch } from "react-router-dom";

import JoinButton from "./JoinButton";

export default class AdoptionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
    };
  }

  render() {
    const testCat = {
      age: 1,
      breed: "domestic longhair",
      description: "stupid-cute",
      gender: "female",
      imageURL:
        "https://scontent-bos3-1.xx.fbcdn.net/v/t1.0-9/90591179_4175031949189378_6651678154110795776_o.jpg?_nc_cat=108&_nc_sid=a4a2d7&_nc_ohc=fvmO1Y0KfEAAX_ZrFLd&_nc_ht=scontent-bos3-1.xx&oh=1eaed677a26bd120797003cc40832dcb&oe=5F9DB008",
      name: "Loki",
      story:
        "Loki was adopted by the best dude ever and is super happy, you can't have her. ",
    };

    const testDog = {
      age: 11,
      breed: "doberman",
      description: "very doberman-like",
      gender: "female",
      imageURL: "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
      name: "ashley",
      story: "kind of a lil bitch",
    };

    return (
      <div className="adopt">
        {/* <Header></Header> */}
        <PetInfo pet={testCat}></PetInfo>
        <PetInfo pet={testDog}></PetInfo>

        {!this.props.isHidden && <JoinButton></JoinButton>}
      </div>
    );
  }
}
