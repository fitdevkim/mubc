const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const tool = require("../tool");

// Bring in User model
let User = require("../../models/user");

// Register Form
router.get("/register", tool.ensureAuthenticated, (req, res) => {
  res.render("admin/user/register");
});

// Register Submit POST Route
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  req.checkBody("username", "Username is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("password2", "Password do not match").equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render("admin/user/register", {
      errors: errors
    });
  } else {
    let newUser = new User({
      username: username,
      password: password
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
      } else {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser.save(err => {
            if (err) {
              console.log(err);
              return;
            } else {
              req.flash("success", "You are registered and can now log in");
              res.redirect("/admin/user/login");
            }
          });
        });
      }
    });
  }
});

// User Login Route
router.get("/login", (req, res) => {
  res.render("admin/user/login");
});

// User Login Submit POST Route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin",
    failureFlash: true
  })(req, res, next);
});

// User Change Password Route
router.get("/update/password", tool.ensureAuthenticated, (req, res) => {
  res.render("admin/user/updatepw");
});

// User Update Password POST Route
router.post("/update/password", (req, res) => {
  let query = { _id: req.user._id };
  const new_pw = req.body.new_pw;

  req.checkBody("new_pw", "New Password is required").notEmpty();
  req.checkBody("new_pw2", "Confirm Password does not match").equals(new_pw);

  let errors = req.validationErrors();

  if (errors) {
    res.render("admin/user/updatepw", { errors: errors });
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

module.exports = router;
