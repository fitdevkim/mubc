const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const tool = require("../tool");

// Bring in User model
let User = require("../../models/user");

// Admin Home Route
router.get("/", (req, res) => {
  res.render("admin/admin");
});

// Admin Login Submit POST Route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin",
    failureFlash: true
  })(req, res, next);
});

// User Change Password Route
router.get("/updatePassword", tool.ensureAuthenticated, (req, res) => {
  res.render("admin/user-control/update_pw");
});

// User Update Password POST Route
router.post("/updatePassword", (req, res) => {
  let query = { _id: req.user._id };
  const new_pw = req.body.new_pw;

  req.checkBody("new_pw", "New Password is required").notEmpty();
  req.checkBody("new_pw2", "Confirm Password does not match").equals(new_pw);

  let errors = req.validationErrors();

  if (errors) {
    res.render("admin/user-control/updatepw", { errors: errors });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
      } else {
        bcrypt.hash(new_pw, salt, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            bcrypt.hash(new_pw, salt, (err, hash) => {
              let upw = { $set: { password: hash } };
              User.updateOne(query, upw, err => {
                if (err) {
                  console.log(err);
                } else {
                  req.flash("success", "Password Updated");
                  res.redirect("/admin");
                }
              });
            });
          }
        });
      }
    });
  }
});

// User Logout Route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You are logged out");
  res.redirect("/admin");
});

// Route Files
let banksias = require("./banksia");
let aboutsects = require("./aboutSect");
let signages = require("./signage");
let geos = require("./geo");
router.use("/banksia", banksias);
router.use("/aboutsects", aboutsects);
router.use("/signage", signages);
router.use("/geo", geos);

module.exports = router;
