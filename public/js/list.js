// banksiaList_C.js (Banksia List Controller Object)
// Utilizes the banksia list view and model objects to work together

class List {
  constructor(listElem, listItemElem) {
    this.listElem = listElem;
    this.listItemElem = listItemElem;
    this.noResult = _createNoResultsMessage();
  }

  // Sets all event listeners and puts the object into a rest state
  init() {
    // Get All Pagination Links
    const pageLinks = document.querySelectorAll(".page-link");
    // Add Event listeners for pagination
    pageLinks.forEach((link, i) => {
      link.addEventListener("click", e => {
        _setActive(i + 1);
      });
    });
    document.querySelector(this.listElem).appendChild(this.noResult);
    this.reset();
  }

  // Filters the banksia list by type (name/season)
  filter(input, endCondition, getItemText) {
    // Get Banksia List HTML Elements
    const list = this.getAllListItems();

    // Displays all the banksia list item HTML elements
    this.displayAllPages();

    // Iterate through the Banksia List HTML elements
    list.forEach(listItem => {
      // Init banksia variable
      let itemText = getItemText(listItem);
      // Compares the banksia to the filter
      if (
        itemText.toLowerCase().indexOf(input.toLowerCase()) != -1 ||
        input === endCondition
      ) {
        // if match, show item HTML element
        listItem.style.display = "block";
      } else {
        // else, hide item HTML element
        listItem.style.display = "none";
      }
    });

    // Check if list is empty
    if (this.isResultsNone()) {
      this.noResult.style.display = "block";
      this.noResult.innerText = `No results found for query (${input}).`;
    } else {
      this.noResult.style.display = "none";
    }

    // Checks if filter input is at end condition
    if (input === endCondition) {
      // Resets the Banksia List UI state
      this.reset();
    }
  }

  // Retrieves an array of elements with the class of banksia-list-item
  getAllListItems() {
    return document.querySelectorAll(this.listItemElem);
  }

  // Sets all pages to be visible
  displayAllPages() {
    _setAllPages("block");
  }

  // Sets the banksia list to its zero state
  reset() {
    _setActive(1);
  }

  isResultsNone() {
    const items = document.querySelectorAll(this.listItemElem);
    let check = true;
    items.forEach(item => {
      if (item.style.display != "none") {
        check = false;
      }
    });
    return check;
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

const _createNoResultsMessage = function() {
  const nr = document.createElement("span");
  nr.style.display = "none";
  return nr;
};

// ----------------------------------------------------------------------------
