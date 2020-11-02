import config from "../config";

const catsApiService = {
  getCats() {
    return fetch(`${config.API_ENDPOINT}/cat`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteCats() {
    return fetch(`${config.API_ENDPOINT}/cat`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then();
  },
};

export default catsApiService;
