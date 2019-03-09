const express = require("express");
const router = express.Router();

let About = require("../../models/aboutsection");

// About Sections API
router.get("/", (req, res) => {
  About.find({}, (err, sections) => {
    if (err) {
      console.log(err);
    } else {
      res.render("explore/about", { sections });
    }
  });
});

module.exports = router;
