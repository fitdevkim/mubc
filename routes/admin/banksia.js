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
}).single("banksiaImg");

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
let Banksia = require("../../models/banksia");
let Geo = require("../../models/geo");

// Bankisa Route
router.get("/", tool.ensureAuthenticated, (req, res) => {
  Banksia.find({}, (err, banksias) => {
    if (err) {
      console.log(err);
    } else {
      const pages = tool.assignToPages(banksias, 10);
      res.render("admin/banksia/banksia", { pages });
    }
  }).sort({ name: 1 });
});

// Add Banksia Add Route
router.get("/add", tool.ensureAuthenticated, (req, res) => {
  res.render("admin/banksia/add_banksia");
});

// Get Single Banksia Route
router.get("/:id", tool.ensureAuthenticated, (req, res) => {
  Banksia.findById(req.params.id, (err, banksia) => {
    if (err) {
      console.log(err);
    } else {
      Geo.find({ refid: req.params.id }, (err, geos) => {
        if (err) {
          console.log(err);
        } else {
          let group = banksia.group,
            cname = false,
            nname = false;

          if (banksia.commonName != "") {
            cname = true;
          }
          if (banksia.noongarName != "") {
            nname = true;
          }

          if (group == "Others") {
            group += "(" + banksia.otherGroupName + ")";
          }

          res.render("admin/banksia/view_banksia", {
            banksia: banksia,
            cname: cname,
            nname: nname,
            group: group,
            geos: geos,
            map: map.center
          });
        }
      });
    }
  });
});

// Add Banksia Submit POST Route
router.post("/add", (req, res) => {
  let fname;
  upload(req, res, err => {
    if (err) {
      req.flash("danger", err);
      res.redirect("/admin/banksia/add");
    } else {
      if (req.file == undefined) {
        req.flash("danger", "No File Selected");
        res.redirect("/admin/banksia/add");
      } else {
        fname = req.file.filename;
        req.checkBody("name", "Name is required.").notEmpty();
        req.checkBody("desc", "Banksia description is required.").notEmpty();
        req.checkBody("habitatDesc", "Habitat description is required.").notEmpty();
        req.checkBody("flowerDesc", "Flower Description is required.").notEmpty();
        req.checkBody("group", "Flowering group is required.").notEmpty();
        if (req.body.group == "Others") {
          req
            .checkBody("otherGroupName", "Other group name is required.")
            .notEmpty();
        }

        // Get Errors
        let errors = req.validationErrors();

        if (errors) {
          res.render("admin/banksia/add_banksia", { errors: errors });
        } else {
          let banksia = new Banksia();
          let fpSpring = req.body.fpSpring;
          let fpSummer = req.body.fpSummer;
          let fpAutumn = req.body.fpAutumn;
          let fpWinter = req.body.fpWinter;

          banksia.name = req.body.name;
          banksia.commonName = req.body.commonName;
          banksia.noongarName = req.body.noongarName;
          banksia.desc = req.body.desc;
          banksia.habitatDesc = req.body.habitatDesc;
          banksia.flowerDesc = req.body.flowerDesc;
          banksia.group = req.body.group;
          banksia.otherGroupName = req.body.otherGroupName;
          banksia.img.push(fname);

          if (fpSpring != null) {
            banksia.flowerPeriod.push(fpSpring);
          }
          if (fpSummer != null) {
            banksia.flowerPeriod.push(fpSummer);
          }
          if (fpAutumn != null) {
            banksia.flowerPeriod.push(fpAutumn);
          }
          if (fpWinter != null) {
            banksia.flowerPeriod.push(fpWinter);
          }

          banksia.save(err => {
            if (err) {
              console.log(err);
              return;
            } else {
              req.flash("success", "Banksia Added");
              res.redirect("/admin/banksia");
            }
          });
        }
      }
    }
  });
});

// Load Edit Banksia Form
router.get("/edit/:id", tool.ensureAuthenticated, (req, res) => {
  Banksia.findById(req.params.id, (err, banksia) => {
    let group = banksia.group;
    let fperiod = banksia.flowerPeriod;
    let isGold = false,
      isOrange = false,
      isOthers = false,
      isProstate = false,
      isWhite = false,
      isYellow = false;
    let isSpring = false,
      isSummer = false,
      isAutumn = false,
      isWinter = false;

    switch (group) {
      case "Gold":
        isGold = true;
        break;
      case "Orange":
        isOrange = true;
        break;
      case "Others":
        isOthers = true;
        break;
      case "Prostate":
        isProstate = true;
        break;
      case "White":
        isWhite = true;
        break;
      case "Yellow":
        isYellow = true;
        break;
    }

    if (fperiod.indexOf("Spring") != -1) {
      isSpring = true;
    }
    if (fperiod.indexOf("Summer") != -1) {
      isSummer = true;
    }
    if (fperiod.indexOf("Autumn") != -1) {
      isAutumn = true;
    }
    if (fperiod.indexOf("Winter") != -1) {
      isWinter = true;
    }

    if (err) {
      console.log(err);
    } else {
      res.render("admin/banksia/edit_banksia", {
        banksia: banksia,
        isGold: isGold,
        isOrange: isOrange,
        isOthers: isOthers,
        isProstate: isProstate,
        isWhite: isWhite,
        isYellow: isYellow,
        isSpring: isSpring,
        isSummer: isSummer,
        isAutumn: isAutumn,
        isWinter: isWinter
      });
    }
  });
});

// Update Banksia Submit POST Route
router.post("/edit/:id", (req, res) => {
  let banksia = {};

  banksia.name = req.body.name;
  banksia.commonName = req.body.commonName;
  banksia.noongarName = req.body.noongarName;
  banksia.desc = req.body.desc;
  banksia.habitatDesc = req.body.habitatDesc;
  banksia.flowerDesc = req.body.flowerDesc;
  banksia.group = req.body.group;
  banksia.otherGroupName = req.body.otherGroupName;
  banksia.flowerPeriod = [];

  let fpSpring = req.body.fpSpring;
  let fpSummer = req.body.fpSummer;
  let fpAutumn = req.body.fpAutumn;
  let fpWinter = req.body.fpWinter;

  if (fpSpring != null) {
    banksia.flowerPeriod.push(fpSpring);
  }
  if (fpSummer != null) {
    banksia.flowerPeriod.push(fpSummer);
  }
  if (fpAutumn != null) {
    banksia.flowerPeriod.push(fpAutumn);
  }
  if (fpWinter != null) {
    banksia.flowerPeriod.push(fpWinter);
  }

  let query = { _id: req.params.id };
  Banksia.findById(req.params.id, (err, b) => {
    if (err) {
      console.log(err);
    } else {
      banksia.img = b.img;
    }
  });

  Banksia.updateOne(query, banksia, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "Banksia Updated");
      res.redirect("/admin/banksia");
    }
  });
});

// Upload Images Submit Post Route
router.post("/image/upload/:id", (req, res) => {
  upload(req, res, err => {
    if (err) {
      req.flash("danger", err);
      res.redirect("/admin/banksia/" + req.params.id);
    } else {
      if (req.file == undefined) {
        req.flash("danger", "No File Selected");
        res.redirect("/admin/banksia/" + req.params.id);
      } else {
        let query = { _id: req.params.id };
        let image = { $push: { img: req.file.filename } };

        Banksia.updateOne(query, image, err => {
          if (err) {
            console.log(err);
            return;
          } else {
            req.flash("success", "Image Uploaded");
            res.redirect("/admin/banksia/" + req.params.id);
          }
        });
      }
    }
  });
});

// Delete Banksia Image Submit POST Route
router.post("/image/delete/:id/:img", (req, res) => {
  let query = { _id: req.params.id };
  let image = { $pull: { img: req.params.img } };

  Banksia.updateOne(query, image, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "Image Deleted");
      res.redirect("/admin/banksia/" + req.params.id);
    }
  });
});

// Delete Banksia Route
router.delete("/:id", (req, res) => {
  let query = { _id: req.params.id };

  Banksia.deleteOne(query, err => {
    if (err) {
      console.log(err);
    }
    req.flash("success", "Banksia Deleted");
    res.send("Success");
  });
});

module.exports = router;
