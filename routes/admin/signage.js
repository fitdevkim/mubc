const express = require("express");
const multer = require("multer");
const path = require("path");
const tool = require("../tool");
const map = require("../../config/map");
const router = express.Router();

// Set Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("signageImg");

// Check File Type
function checkFileType(file, cb) {
  // Allow Extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check Extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check Mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only");
  }
}

// Bring in Models
let Signage = require("../../models/signage");
let Geo = require("../../models/geo");

// Signage Route
router.get("/", tool.ensureAuthenticated, (req, res) => {
  Signage.find({}, (err, signages) => {
    if (err) {
      console.log(err);
    } else {
      const pages = tool.assignToPages(signages, 10);
      res.render("admin/signage/signage", { pages });
    }
  });
});

// Add Signage Route
router.get("/add", tool.ensureAuthenticated, (req, res) => {
  res.render("admin/signage/add_signage");
});

// Add Signage Submit POST Route
router.post("/add", (req, res) => {
  let fname;
  upload(req, res, err => {
    if (err) {
      req.flash("danger", err);
      res.redirect("/admin/signage/add");
    } else {
      if (req.file != undefined) {
        fname = req.file.filename;
      }

      req.checkBody("name", "Name is required.").notEmpty();
      req.checkBody("desc", "Signage description is required.").notEmpty();

      let errors = req.validationErrors();

      if (errors) {
        res.render("admin/signage/add_signage", {
          errors: errors
        });
      } else {
        let signage = new Signage();

        signage.name = req.body.name;
        signage.desc = req.body.desc;
        if (fname != null) {
          signage.img.push(fname);
        }

        signage.save(err => {
          if (err) {
            console.log(err);
            return;
          } else {
            req.flash("success", "Signage Added");
            res.redirect("/admin/signage");
          }
        });
      }
    }
  });
});

// Load Edit Signage Route
router.get("/:id", tool.ensureAuthenticated, (req, res) => {
  Signage.findById(req.params.id, (err, signage) => {
    if (err) {
      console.log(err);
    } else {
      Geo.find({ refid: req.params.id }, (err, geos) => {
        if (err) {
          console.log(err);
        } else {
          res.render("admin/signage/edit_signage", {
            signage: signage,
            geos: geos,
            map: map.center
          });
        }
      });
    }
  });
});

// Update Edit Signage POST Route
router.post("/:id", (req, res) => {
  let signage = {};

  signage.name = req.body.name;
  signage.desc = req.body.desc;

  let query = { _id: req.params.id };
  Signage.findById(req.params.id, (err, s) => {
    if (err) {
      console.log(err);
    } else {
      signage.img = s.img;
    }
  });

  Signage.updateOne(query, signage, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "Signage Updated");
      res.redirect("/admin/signage");
    }
  });
});

// Upload Signage Image Submit Post Route
router.post("/image/upload/:id", (req, res) => {
  upload(req, res, err => {
    if (err) {
      req.flash("danger", err);
      res.redirect("/admin/signage/" + req.params.id);
    } else {
      if (req.file == undefined) {
        req.flash("danger", "No File Selected");
        res.redirect("/admin/signage/" + req.params.id);
      } else {
        let query = { _id: req.params.id };
        let image = { $push: { img: req.file.filename } };

        Signage.updateOne(query, image, err => {
          if (err) {
            console.log(err);
            return;
          } else {
            req.flash("success", "Image Uploaded");
            res.redirect("/admin/signage/" + req.params.id);
          }
        });
      }
    }
  });
});

// Delete Signage Image Submit POST Route
router.post("/image/delete/:id/:img", (req, res) => {
  let query = { _id: req.params.id };
  let image = { $pull: { img: req.params.img } };

  Signage.updateOne(query, image, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "Image Deleted");
      res.redirect("/admin/signage/" + req.params.id);
    }
  });
});

// Delete Signage Route
router.delete("/:id", (req, res) => {
  let query = { _id: req.params.id };

  Signage.deleteOne(query, err => {
    if (err) {
      console.log(err);
    }
    req.flash("success", "Signage Deleted");
    res.send("Success");
  });
});

module.exports = router;
