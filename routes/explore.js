const express = require("express");
const router = express.Router();

let About = require("../models/aboutsection");
let Banksia = require("../models/banksia");
let Signage = require("../models/signage");

// Home Route
router.get("/", (req, res) => {
  About.findOne({ sectionType: "notice" }, (err, notice) => {
    if (err) {
      console.log(err);
    } else {
      res.render("explore/index", { notice });
    }
  });
});

// Explore Banksia Route
router.get("/banksia", (req, res) => {
  Banksia.find({}, (err, banksias) => {
    if (err) {
      console.log(err);
    } else {
      const pages = _assignToPages(banksias, 5);
      res.render("explore/banksia", { pages });
    }
  }).sort({ name: 1 });
});

// Banksia Single Route
router.get("/banksia/:id", (req, res) => {
  Banksia.findById(req.params.id, (err, b) => {
    if (err) {
      console.log(err);
    } else {
      res.render("explore/view_banksia", { b });
    }
  });
});

// Signage Single Route
router.get("/signage/:id", (req, res) => {
  Signage.findById(req.params.id, (err, s) => {
    if (err) {
      console.log(err);
    } else {
      res.render("explore/view_signage", { s });
    }
  });
});

// About Sections API
router.get("/about", (req, res) => {
  About.find({ sectionType: { $ne: "notice" } }, (err, sections) => {
    if (err) {
      console.log(err);
    } else {
      var sectionMap = new Map(
        sections.map(i => [i.sectionType, { name: i.name, desc: i.desc }])
      );
      res.render("explore/about", { section: sectionMap });
    }
  });
});

// Contact us API
router.get("/about/contact", (req, res) => {
  About.find({ sectionType: { $ne: "notice" } }, (err, sections) => {
    if (err) {
      console.log(err);
    } else {
      var sectionMap = new Map(
        sections.map(i => [i.sectionType, { name: i.name, desc: i.desc }])
      );
      res.render("explore/contact", { section: sectionMap });
    }
  });
});

// Explore Map Route
router.get("/map", (req, res) => {
  res.render("explore/map");
});

module.exports = router;

// Segment Banksia objects into page depending on perPage
// Returns an array of pages
const _assignToPages = (list, perPage) => {
  let pages = [],
    page;
  let perPageCount = 0;
  list.forEach((item, index) => {
    if (perPageCount === 0) {
      page = [];
    }
    page.push(item);
    if (perPageCount === perPage - 1 || index === list.length - 1) {
      perPageCount = 0;
      pages.push(page);
    } else {
      perPageCount++;
    }
  });
  return pages;
};
