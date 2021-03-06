import config from "../config";

const peopleApiService = {
  getPeople() {
    return fetch(`${config.REACT_APP_API_BASE}/people`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postPeople(data) {
    let name = { person: data };
    return fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(name),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deletePeople() {
    return fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default peopleApiService;
