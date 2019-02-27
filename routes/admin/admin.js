const express = require("express");
const router = express.Router();

// Admin Home Route
router.get("/", (req, res) => {
  res.render("admin/admin");
});

// Route Files
let banksias = require("./banksia");
let aboutsects = require("./aboutSect");
let signages = require("./signage");
let user = require("./user");
let geos = require("./geo");
router.use("/banksia", banksias);
router.use("/aboutsects", aboutsects);
router.use("/signage", signages);
router.use("/user", user);
router.use("/geo", geos);

module.exports = router;
