// mubcAPI.js (MUBC API Model Object)
// An object that fetches data from an api

class MUBC_API {
  // A constructor that takes in the type of api required
  constructor(type) {
    this.type = type;
  }

  // A get function that takes in an optional id parameter
  // returns a PROMISE
  async get(id = 0) {
    // Init path
    let path;
    // Checks if there is an id input into the function
    if (id === 0) {
      // Sets path to type
      path = `/api/${this.type}`;
    } else {
      // Sets path to type and id
      path = `/api/${this.type}/${id}`;
    }
    // Fetches the api from path
    const resp = await fetch(path, { mode: "cors" });
    // Sets response data as a JSON object
    const respData = await resp.json();
    // Returns response data
    return respData;
  }
}
