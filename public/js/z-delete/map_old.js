// map_C.js (Map Controller Object)
// Utilizes the map list view and model objects to work together

class Map {
  // Map constructor which takes in the map id name
  constructor(type, mapId) {
    this.type = type;
    this.mapid = mapId;
    this.ui = new MapUI(type, mapId, mapConfig);
  }

  // Loads the map object component which takes in an optional id parameter
  load(id = 0) {
    const geosAPI = new MUBC_API("geo");
    const banksiaAPI = new MUBC_API("banksia");
    const singageAPI = new MUBC_API("signage");

    geosAPI
      .get(id)
      .then(geos => {
        geos.forEach((geo, index) => {
          if (geo.type === "banksia") {
            banksiaAPI
              .get(geo.refid)
              .then(banksia => {
                this.ui.paintMarker(geo, banksia, index);
              })
              .catch(err => {
                console.log(err);
              });
          } else if (geo.type === "signage") {
            singageAPI
              .get(geo.refid)
              .then(signage => {
                this.ui.paintMarker(geo, signage, index);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log(`ERR: No such geo type (${geo.type})`);
          }
        });
      })
      .catch(err => console.log(err));
  }

  locateUser() {
    this.ui.locateUser();
  }
}
