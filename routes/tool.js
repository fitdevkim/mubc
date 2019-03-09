module.exports = {
  // Access Control
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("danger", "Please login");
      res.redirect("/admin");
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
  }
};
