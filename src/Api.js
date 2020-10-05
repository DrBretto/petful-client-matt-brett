
import config from '../config'

const ApiService = {
  
  removeRandomPet(pet) {

    fetch(`${config.API_ENDPOINT}/pets`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          pet: pet
        })
      })
      .then(res => {
        if(!res) {
          throw new Error('Something went wrong, try again')
        } else {
        return res.json()
        }
      })
  },

  removeFrontPerson() {
    fetch(`${config.API_ENDPOINT}/people`,
          {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            }
          })
          .then(res => {
            if(!res) {
              throw new Error('Something went wrong, try again')
            }
          })
  },

  addRandomPerson(name) {

    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          name
        }
      )
    })
    .then(res => {
      if(!res) {
        throw new Error('Something went wrong, try again')
      } else {
        return res
      }
    })
  }
}

export default ApiService