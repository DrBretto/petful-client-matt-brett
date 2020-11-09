import config from "../config";

const petsApiService = {
  getPets() {
    return fetch(`${config.REACT_APP_API_BASE}/pets`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deletePet(pet) {
    return fetch(`${config.REACT_APP_API_BASE}/pets`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ type: pet }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res
    );
  },
};

export default petsApiService;
