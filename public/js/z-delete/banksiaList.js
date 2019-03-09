// banksiaList_C.js (Banksia List Controller Object)
// Utilizes the banksia list view and model objects to work together

class BanksiaList {
  constructor() {
    this.init();
  }

  // Sets all event listeners and puts the object into a rest state
  init() {
    // Get All Pagination Links
    const pageLinks = document.querySelectorAll(".page-link");
    // Get Search HTML Element
    const search = document.getElementById("search");
    // Get All Seasons Filter HTML Elements
    const seasons = document.querySelectorAll(".badge");
    // Add Event listeners for pagination
    pageLinks.forEach((link, i) => {
      link.addEventListener("click", e => {
        _setActive(i + 1);
      });
    });
    // Add Name filter event listener
    search.addEventListener("keyup", e => this.filter(e, "name"));
    // Add Season filter event listener
    seasons.forEach(season => {
      season.addEventListener("click", e => this.filter(e, "season"));
    });
    // Resets the page view
    this.reset();
  }

  // Filters the banksia list by type (name/season)
  filter(e, type) {
    // Get Banksia List HTML Elements
    const list = this.getAllListItems();
    // Init variables
    let filter, endCondition;

    // Check filter type
    if (type === "name") {
      // Gets the search input value
      filter = e.target.value.toLowerCase();
    } else if (type === "season") {
      // Gets the season button text
      filter = e.target.textContent.toLowerCase();
      // Sets search field to empty
      document.getElementById("search").value = "";
    } else {
      // Invalid filter type
      console.log("ERR: Invalid filter type");
      return false;
    }

    // Displays all the banksia list item HTML elements
    this.displayAllPages();

    // Iterate through the Banksia List HTML elements
    list.forEach(listItem => {
      // Init banksia variable
      let banksia;
      // Check filter type
      if (type === "name") {
        // Gets banksia name from span element text
        banksia = listItem.lastChild.textContent;
        // Sets filter end condition as empty search input
        endCondition = "";
      } else if (type === "season") {
        // Gets banksia flowering periods from the hidden input
        banksia = listItem.firstChild.value;
        // Sets filter end condition as the reset button
        endCondition = "reset";
      } else {
        // Invalid filter type
        console.log("ERR: Invalid filter type");
        return false;
      }

      // Compares the banksia to the filter
      if (banksia.toLowerCase().indexOf(filter) != -1 || filter === endCondition) {
        // if match, show item HTML element
        listItem.style.display = "flex";
      } else {
        // else, hide item HTML element
        listItem.style.display = "none";
      }
    });

    // Checks if filter input is at end condition
    if (filter === endCondition) {
      // Resets the Banksia List UI state
      this.reset();
    }
  }

  // Retrieves an array of elements with the class of banksia-list-item
  getAllListItems() {
    return document.querySelectorAll(".banksia-list-item");
  }

  // Sets all pages to be visible
  displayAllPages() {
    _setAllPages("block");
  }

  // Sets the banksia list to its zero state
  reset() {
    _setActive(1);
  }
}

// ----------------------------------------------------------------------------
// PRIVATE FUNCTIONS

// Sets all pages visibility based on the parameter display
const _setAllPages = function(display) {
  // Gets an array of all the elements with class name page
  const pages = document.querySelectorAll(".page");
  // Gets an array of all the elements with class name pagination
  const pagination = document.querySelector(".pagination");
  // Iterate through each page
  pages.forEach(page => {
    // Set the visibility to the parameter display
    page.style.display = display;
  });
  // Hide all pagination elements
  pagination.style.display = "none";
};

const _setActive = function(pageNum) {
  _setActivePage(pageNum);
  _setActivePagination(pageNum);
};

const _setActivePage = function(pageNum) {
  const page = document.getElementById(`page-${pageNum}`);
  _setAllPages("none");
  page.style.display = "block";
};

const _setActivePagination = function(pageNum) {
  const pageUI = document.getElementById(`page-item-${pageNum}`);
  _resetPagination();
  pageUI.className = "page-item active";
};

const _resetPagination = function() {
  const pis = document.querySelectorAll(".page-item");
  const pagination = document.querySelector(".pagination");

  pagination.style.display = "flex";

  pis.forEach(pi => {
    pi.className = "page-item";
  });
  pis.display = "block";
};

// ----------------------------------------------------------------------------
