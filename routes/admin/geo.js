const express = require("express");
const router = express.Router();
const bounds = {
  nw: {
    lat: -32.0677183,
    lng: 115.8345216
  },
  se: {
    lat: -32.0686394,
    lng: 115.8356287
  }
};

const isBounds = (point, bounds) => {
  return (
    point.lat < bounds.nw.lat &&
    point.lat > bounds.se.lat &&
    point.lng > bounds.nw.lng &&
    point.lng < bounds.se.lng
  );
};

// Bring in Geolocation Model
let Geo = require("../../models/geo");

// Add geolocation Submit POST route
router.post("/:type/add/:id", (req, res) => {
  let type = req.params.type;
  let id = req.params.id;
  let point = {
    lat: req.body.lat,
    lng: req.body.lng
  };

  if (!isBounds(point, bounds)) {
    req.flash(
      "danger",
      "Geolocation Point (" +
        point.lat +
        "," +
        point.lng +
        ") is not within bounds"
    );
    res.redirect("/admin/" + type + "/" + id);
  } else {
    let geo = new Geo();
    geo.type = type;
    geo.refid = id;
    geo.lat = point.lat;
    geo.lng = point.lng;

    geo.save(err => {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash("success", "Geolocation Added");
        res.redirect("/admin/" + type + "/" + id);
      }
    });
  }
});

// Delete geo POST
router.post("/:type/:rid/delete/:id", (req, res) => {
  let query = { _id: req.params.id };

  Geo.deleteOne(query, err => {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Geolocation Deleted");
      res.redirect("/admin/" + req.params.type + "/" + req.params.rid);
    }
  });
});

module.exports = router;
