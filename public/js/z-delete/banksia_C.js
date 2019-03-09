// banksia_C.js (Banksia Controller Object)
// Utilizes the banksia view and model objects to work together

class Banksia {
  // Loads the banksia object component
  load(id) {
    // Init model
    const api = new MUBC_API("banksia");
    // Init view
    const ui = new BanksiaUI();
    // // Paints the view object with the model data
    // api
    //   .get(id)
    //   .then(banksia => ui.paint(banksia))
    //   .catch(err => console.log(err));
  }
}
