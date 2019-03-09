var map;

const initMap = (lat, lng, id) => {
  map = L.map(id, {
    center: [lat, lng],
    zoom: 19
  });

  L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
    minZoom: 18,
    maxZoom: 21,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
  }).addTo(map);

  map.setMaxBounds(map.getBounds());
};

const drawPoint = (lat, lng, msg) => {
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(msg);
};

// var banksiaIcon = L.icon({
//   iconUrl: './map_img/corn.png',

//   iconSize: [32, 37], // size of the icon
//   iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
// });

class Map {
  constructor(center, mapid, zoom) {
    this.map = L.map(mapid, {
      center: center,
      zoom: zoom
    });
    L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      minZoom: 18,
      maxZoom: 21,
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    }).addTo(this.map);
  }

  drawPoint(lat, lng, msg) {
    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(msg);
  }
}

const center = {
  lat: -32.06823110979768,
  lng: 115.83507746458054
};

const mubcMap = new Map(center, "mubc-map", 19);
