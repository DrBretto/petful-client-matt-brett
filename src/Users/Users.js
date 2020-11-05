import React, { Component } from 'react';

export default class Users extends Component{
    
    
    renderUsers(){
        const usersList = this.props.users.map((user, i) => {
          return(
            <div key={i}>{user.name}</div>
          );
        });
        return usersList;
      }
    
    render(){
        if(this.props.users.length > 0){
            return (
              <section className="userList">
                <div>{this.renderUsers()}</div>
              </section>
            );
          }
      
          else{
            return (
              <>
              </>
            );
          }
    }
}