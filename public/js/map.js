// map_C.js (Map Controller Object)
// Utilizes the map list view and model objects to work together

class Map {
  // Map constructor which takes in the map id name
  constructor(type, mapId) {
    this.type = type;
    this.mapid = mapId;
    this.map = L.map(mapId, {
      center: mapConfig.center,
      zoom: mapConfig.zoom,
      zoomDelta: 0.25,
      zoomSnap: 0 // <-- Remember to do a live test
    });
    L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      minZoom: mapConfig.minZoom,
      maxZoom: mapConfig.maxZoom,
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    }).addTo(this.map);

    this.map.setMaxBounds(this.map.getBounds());
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
                this.paintMarker(geo, banksia, index);
              })
              .catch(err => {
                console.log(err);
              });
          } else if (geo.type === "signage") {
            singageAPI
              .get(geo.refid)
              .then(signage => {
                this.paintMarker(geo, signage, index);
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

  paintMarker(geo, obj, index) {
    const marker = L.marker([geo.lat, geo.lng]);
    if (this.type === "admin") {
      marker.bindPopup(this._getAdminMarkerPopUp(geo, index));
    } else if (this.type === "explore") {
      if (geo.type === "banksia") {
        marker.bindPopup(this._getBanksiaMarkerPopUp(obj));
      } else if (geo.type === "signage") {
        marker.bindPopup(this._getSignageMarkerPopUp(obj));
      }
    }
    marker.addTo(this.map);
  }

  locateUser() {
    this.map.locate({ setView: true });
  }

  _getAdminMarkerPopUp(geo, index) {
    return `
      Latitude: ${geo.lat}<br> 
      Longtitude: ${geo.lng}<br>
      <button 
        style='color:white;' 
        class='btn btn-danger btn-sm btn-block mt-1 delete-geo' 
        data-toggle='modal' 
        data-target='#geo-${index}'
      >Delete Point</button>`;
  }

  _getBanksiaMarkerPopUp(banksia) {
    return `
      <a href="/banksia/${banksia._id}">
        <h6 class="text-center">${banksia.name}</h6>
        <img src="/uploads/${banksia.img[0]}" class="img-thumbnail">
      </a>`;
  }

  _getSignageMarkerPopUp(signage) {
    return signage.name;
  }
}
