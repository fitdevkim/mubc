const express = require("express");
const tool = require("../tool");
const router = express.Router();

// Bring in About Section Model
let AboutSection = require("../../models/aboutsection");

// About Sections Route
router.get("/", tool.ensureAuthenticated, (req, res) => {
  AboutSection.find({}, (err, aboutSects) => {
    if (err) {
      console.log(err);
    } else {
      res.render("admin/aboutSects/aboutSects", { aboutSects });
    }
  });
});

// Update Edit About Section POST Route
router.post("/edit/:id", (req, res) => {
  let aboutSect = {};
  let query = { _id: req.params.id };

  AboutSection.findById(req.params.id, (err, as) => {
    if (err) console.log(err);
    else aboutSect.sectionType = as.sectionType;
  });

  aboutSect.name = req.body.name;
  aboutSect.desc = req.body.desc;

  AboutSection.updateOne(query, aboutSect, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "Section Updated");
      res.redirect("/admin/aboutSects");
    }
  });
});

module.exports = router;
