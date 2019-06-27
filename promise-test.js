const fetch = require("cross-fetch")

const callApi = (endpoint) => {
  return fetch(endpoint)
    .then(response =>
      response.json().then(json => {
        return json
      })
    )
}

callApi("https://www.google.com").then(res => {
  console.log("RES RECIEVED!!")
}, err => {
  console.log("ERR RECIEVED!! FIRST", err)
})