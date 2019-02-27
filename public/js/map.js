var map = L.map("mapid", {
  center: [-32.06823110979768, 115.83507746458054],
  zoom: 19
});

L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  minZoom: 18,
  maxZoom: 21,
  subdomains: ["mt0", "mt1", "mt2", "mt3"]
}).addTo(map);

map.setMaxBounds(map.getBounds());

// var banksiaIcon = L.icon({
//   iconUrl: './map_img/corn.png',

//   iconSize: [32, 37], // size of the icon
//   iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -37] // point from which the popup should open relative to the iconAnchor
// });

function drawPoint(lat, lng, msg) {
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(msg);
}
