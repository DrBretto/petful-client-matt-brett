import React, { Component } from 'react'


export default class JoinButton extends Component {
constructor (props) {
  super(props)

  this.state = {

  }
}

  render() {
    return (
      <form>
        
        <input label="name" defaultValue="Enter Your name"></input>
        <button type="submit">Join Queue</button>

      </form>
    )
  }
}
