import config from '../config';

const petsApiService = {
  getPets() {
    return fetch(`${config.API_ENDPOINT}/pets`)
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json());
  },
  deletePets(){
    return fetch(`${config.API_ENDPOINT}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then();
  }
};

export default petsApiService;