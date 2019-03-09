const express = require("express");
const router = express.Router();
const map = require("../config/map");

let Geo = require("../models/geo");
let Banksia = require("../models/banksia");
let Signage = require("../models/signage");
let About = require("../models/aboutsection");

// Map API
router.get("/map", (req, res) => res.json(map));

// Geolocation API
// Returns all geo items
router.get("/geo", (req, res) => {
  Geo.find({}, (err, geos) => {
    if (err) {
      res.render(err);
    } else {
      res.json(geos);
    }
  });
});

// Geolocation API
// Returns geo items based on reference id
router.get("/geo/:id", (req, res) => {
  Geo.find({ refid: req.params.id }, (err, geos) => {
    if (err) {
      res.render(err);
    } else {
      res.json(geos);
    }
  });
});

// Banksias API
router.get("/banksia", (req, res) => {
  Banksia.find({}, (err, banksias) => {
    if (err) {
      res.render(err);
    } else {
      res.json(banksias);
    }
  }).sort({ name: 1 });
});

// Single Banksia API
router.get("/banksia/:id", (req, res) => {
  Banksia.findById(req.params.id, (err, banksia) => {
    if (err) {
      res.render(err);
    } else {
      res.json(banksia);
    }
  });
});

// Signage API
router.get("/signage", (req, res) => {
  Signage.find({}, (err, signage) => {
    if (err) {
      res.render(err);
    } else {
      res.json(signage);
    }
  }).sort({ name: 1 });
});

// Single Signage API
router.get("/signage/:id", (req, res) => {
  Signage.findById(req.params.id, (err, signage) => {
    if (err) {
      res.render(err);
    } else {
      res.json(signage);
    }
  });
});

// About Sections API
router.get("/about", (req, res) => {
  About.find({}, (err, sections) => {
    if (err) {
      res.render(err);
    } else {
      res.json(sections);
    }
  });
});

// Single About Section API
router.get("/about/:type", (req, res) => {
  About.find({ sectionType: req.params.type }, (err, section) => {
    if (err) {
      res.render(err);
    } else {
      res.json(section);
    }
  });
});

module.exports = router;
