const express = require("express");
const router = express.Router();

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

module.exports = router;
