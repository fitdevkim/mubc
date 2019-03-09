// banksiaList_UI.js (banksia list view object)
// This class focusses on the HTML elements of the banksia list object

class BanksiaListUI {
  constructor() {
    // Gets the banksia list HTML element
    this.root = document.getElementById("banksia-list");
  }

  // Loads all the list items
  init() {
    // Add Event listeners for pagination
    document.querySelectorAll(".page-link").forEach((link, i) => {
      link.addEventListener("click", e => {
        this._setActive(i + 1);
      });
    });
    // Resets the page view
    this.reset();
  }

  // Retrieves an array of elements with the class of banksia-list-item
  getAllListItems() {
    return document.querySelectorAll(".banksia-list-item");
  }

  // Sets all pages to be visible
  displayAllPages() {
    this._setAllPages("block");
  }

  // Creates the error message element
  loadError(msg) {
    // Create error paragraph HTML element
    const err = document.createElement("p");
    // Append message to error paragraph
    err.appendChild(document.createTextNode(msg));
    // Sets error paragraph element class names
    err.className = "alert alert-danger mx-2";
    // Append element to the banksia list
    this.root.appendChild(err);
  }

  // Sets the banksia list to its zero state
  reset() {
    this._setActive(1);
  }

  // Sets all pages visibility based on the parameter display
  _setAllPages(display) {
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
  }

  _setActive(pageNum) {
    this._setActivePage(pageNum);
    this._setActivePagination(pageNum);
  }

  _setActivePage(pageNum) {
    const page = document.getElementById(`page-${pageNum}`);
    this._setAllPages("none");
    page.style.display = "block";
  }

  _setActivePagination(pageNum) {
    const pageUI = document.getElementById(`page-item-${pageNum}`);
    this._resetPagination();
    pageUI.className = "page-item active";
  }

  _resetPagination() {
    const pis = document.querySelectorAll(".page-item");
    const pagination = document.querySelector(".pagination");

    pagination.style.display = "flex";

    pis.forEach(pi => {
      pi.className = "page-item";
    });
    pis.display = "block";
  }
}
