import config from '../config';

const petsApiService = {
  getPets() {
    return fetch(`${config.API_ENDPOINT}/pets`, {
      headers: {},
    }).then((res) =>
    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deletePets(pet){
    return fetch(`${config.API_ENDPOINT}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ type: pet }),
    })
      .then(res =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : Promise.resolve(''));
  }
};

export default petsApiService;