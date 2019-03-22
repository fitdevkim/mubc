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
      marker.bindPopup(_getAdminMarkerPopUp(geo, index));
    } else if (this.type === "explore" || this.type === "view") {
      if (geo.type === "banksia") {
        marker.setIcon(banksiaIcon);
        if (this.type === "explore") marker.bindPopup(_getBanksiaMarkerPopUp(obj));
      } else if (geo.type === "signage") {
        marker.setIcon(signageIcon);
        if (this.type === "explore") marker.bindPopup(_getSignageMarkerPopUp(obj));
      }
    }
    marker.addTo(this.map);
  }

  locateUser() {
    this.map
      .locate({ setView: true })
      .on("locationfound", e => {
        const point = { lat: e.latitude, lng: e.longitude };
        const bounds = mapConfig.bounds;
        // Check if user is within boundary
        if (!isBounds(point, bounds)) {
          alert("You are not within the Banksia Court.");
        } else {
          const marker = L.marker([e.latitude, e.longitude]);
          marker.bindPopup("You are here");
          marker.addTo(this.map);
        }
      })
      .on("locationerror", e => {
        console.log(e);
        alert(`Location access denied.\n${e.message}`);
      });
  }
}

const _getAdminMarkerPopUp = function(geo, index) {
  return `
      Latitude: ${geo.lat}<br> 
      Longtitude: ${geo.lng}<br>
      <button 
        style='color:white;' 
        class='btn btn-danger btn-sm btn-block mt-1 delete-geo' 
        data-toggle='modal' 
        data-target='#geo-${index}'
      >Delete Point</button>`;
};

const _getBanksiaMarkerPopUp = function(banksia) {
  return `
      <a class="marker-popup" href="/banksia/${banksia._id}">
        <img src="/uploads/${banksia.img[0]}">  
        <span>${banksia.name}</span> 
      </a>`;
};

const _getSignageMarkerPopUp = function(signage) {
  return `
      <a class="marker-popup" href="/signage/${signage._id}">
        <span>${signage.name}</span>
      </a>`;
};

const banksiaIcon = L.icon({
  iconUrl: "/img/signage option-21.png",

  iconSize: [35, 32.7], // size of the icon
  popupAnchor: [0, -16.35] // point from which the popup should open relative to the iconAnchor
});

const signageIcon = L.icon({
  iconUrl: "/img/signage option-22.png",

  iconSize: [35, 36.3], // size of the icon
  popupAnchor: [0, -18.15] // point from which the popup should open relative to the iconAnchor
});

const isBounds = (point, bounds) => {
  return (
    point.lat < bounds.nw.lat &&
    point.lat > bounds.se.lat &&
    point.lng > bounds.nw.lng &&
    point.lng < bounds.se.lng
  );
};
