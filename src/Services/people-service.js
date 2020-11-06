import config from '../config';

const peopleApiService = { 
  getPeople() {
    return fetch(`${config.API_ENDPOINT}/people`)
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json());
  },
  postPeople(data){
    let name ={name:data}
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(name)
    })
    .then((res) =>
    !res.ok ? res.json().then((e) => Promise.reject(e)) : Promise.resolve('')
  );
  },
  deletePeople() {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : Promise.resolve('')
    );
  }
};

export default peopleApiService;