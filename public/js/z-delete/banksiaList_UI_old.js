// banksiaList_UI.js (banksia list view object)
// This class focusses on the HTML elements of the banksia list object

class BanksiaListUI {
  constructor() {
    // Gets the banksia list HTML element
    this.root = document.getElementById("banksia-list");
    // Sets a default items per page amount
    this.perPage = 5;
  }

  // Loads all the list items
  loadListItems(list) {
    // Init page div variable
    let page;
    // Init items per page count variable
    let perPageCount = 0;
    // Init page caount variable
    let pageCount = 1;
    // Iterate Through the list of banksias
    list.forEach((listItem, index) => {
      // Checks if this is the first item of this page instance
      if (perPageCount === 0) {
        // Create page div HTML element
        page = document.createElement("div");
        // Set div class name to page
        page.className = "page";
        // Set div id to an unique page id
        page.id = `page-${pageCount++}`;
      }
      // Adds a list item to the page
      page.appendChild(this._createListItem(listItem));
      // Checks if at the end of the page or the end of the list
      if (perPageCount === this.perPage - 1 || index === list.length - 1) {
        // Resets the per page count
        perPageCount = 0;
        // Adds the page to the list
        this.root.appendChild(page);
      } else {
        // Next per page list item
        perPageCount++;
      }
    });
    // Adds the page nav to the bottom of the list
    this.root.appendChild(this._createPaginationItems(pageCount));
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

  // Creates a single list item html element
  _createListItem(banksia) {
    // Create link element for banksia list item
    const link = document.createElement("a");
    // Create input element for banksia season
    const seasons = document.createElement("input");
    // Create img element for the image item
    const img = document.createElement("img");
    // Create span element for banksia name
    const span = document.createElement("span");
    // Set link href
    link.href = "/banksia/" + banksia._id;
    // Set link classname
    link.className = "banksia-list-item";
    // Set seasons input type to hidden
    seasons.type = "hidden";
    // Sets seasons input value
    seasons.value = banksia.flowerPeriod;
    // Checks if there is an image stored
    if (banksia.img[0] !== undefined) {
      // if true, set the image to the first image in the img array
      img.src = `/uploads/${banksia.img[0]}`;
    } else {
      // else, set to default imgae
      img.src = "/img/no-img.png";
    }
    // Append banksia name to span element
    span.appendChild(document.createTextNode(banksia.name));
    // Append input element to link element
    link.appendChild(seasons);
    // Append img element to link element
    link.appendChild(img);
    // Append span element to link element
    link.appendChild(span);
    // Returns the banksia list item link
    return link;
  }

  // Creates the Pagination UI
  _createPaginationItems(pagecount) {
    // Creates
    const ul = document.createElement("ul");
    ul.className = "pagination justify-content-center mt-4";

    for (let index = 1; index < pagecount; index++) {
      const li = document.createElement("li");
      const link = document.createElement("a");

      li.id = `page-item-${index}`;
      li.className = "page-item";
      link.className = "page-link";
      link.appendChild(document.createTextNode(index));
      link.href = "#banksia-list";
      link.addEventListener("click", e => {
        this._setActive(index);
      });
      li.appendChild(link);
      ul.appendChild(li);
    }
    return ul;
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
