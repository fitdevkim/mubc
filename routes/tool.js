const express = require('express');
const multer = require('multer');
const path = require('path');

module.exports = {
  // Access Control
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/admin');
    }
  },

  // Segment Banksia objects into page depending on perPage
  // Returns an array of pages
  assignToPages: function(list, perPage) {
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
  },

  upload: function(type) {
    // Set Storage Engine
    const storage = multer.diskStorage({
      destination: './public/uploads',
      filename: function(req, file, cb) {
        cb(
          null,
          file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
      }
    });

    // Init Upload
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 },
      fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
      }
    }).single(type);

    return upload;
  }
};

// Check File Type
const checkFileType = (file, cb) => {
  // Allow Extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check Extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check Mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only');
  }
};
