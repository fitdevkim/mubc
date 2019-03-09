// main.js (Front-End Javascript)

// ------------------------------------------------------------------------- //
// EXPLORE BANKSIA EVENT LISTENERS

// Check if path is /banksia
if (_checkPath("/banksia")) {
  switch (_getPathLength()) {
    case 2: // Banksia List Page
      // Init Banksia List
      // new BanksiaList();
      const search = document.getElementById("search");
      const seasonFilters = document.querySelectorAll(".season");
      const list = new List(".banksia-list", ".banksia-list-item");
      list.init();
      search.addEventListener("keyup", e => {
        const input = e.target.value;
        list.filter(input, "", listItem => {
          return listItem.firstChild.lastChild.textContent;
        });
        e.preventDefault();
      });
      seasonFilters.forEach(season => {
        season.addEventListener("click", e => {
          const period = e.target.textContent;
          list.filter(period, "Reset", listItem => {
            return listItem.firstChild.firstChild.value;
          });
          search.value = "";
          e.preventDefault();
        });
      });
      break;
    case 3: // View Banksia Page
      const map = new Map("explore", "mubc-map");
      // Get Banksia ID
      const id = _getPathPart(2);
      // On Page Load
      document.addEventListener("DOMContentLoaded", e => {
        // Load the Map Component
        map.load(id);
      });
      break;
    default:
      break;
  }
}

// ------------------------------------------------------------------------- //
// EXPLORE MAP EVENT LISTENERS

if (_checkPath("/map")) {
  const map = new Map("explore", "explore-map");
  map.load();
  document
    .getElementById("locate-me")
    .addEventListener("click", e => map.locateUser());
  // map.locateUser();
}

// ------------------------------------------------------------------------- //
// UTILITY FUNCTIONS

// Checks if the current window location is the desired pathname
function _checkPath(pathname) {
  return window.location.pathname.toLowerCase().indexOf(pathname) != -1;
}

// Returns the num of paths(/) in the window location pathname
function _getPathLength() {
  return window.location.pathname.split("/").length;
}

// Returns the desired part of the pathname
function _getPathPart(index) {
  return window.location.pathname.split("/")[index];
}
