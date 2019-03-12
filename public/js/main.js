// main.js (Front-End Javascript)

// Test animation
// document.addEventListener("DOMContentLoaded", e => {
//   const bodyStyle = document.body.style;
//   // bodyStyle.visibility = "hidden";
//   bodyStyle.opacity = "0";
//   bodyStyle.transition = "none";
//   setTimeout(() => {
//     // bodyStyle.visibility = "visible";
//     bodyStyle.opacity = "1";
//     bodyStyle.transition = "0.5s opacity";
//   }, 600);
// });

document.addEventListener("DOMContentLoaded", e => {
  const overlay = document.querySelector(".menu-wrap .menu > div");
  overlay.style.visbility = "hidden";
  setTimeout(() => {
    overlay.style.visbility = "visible";
  }, 0.7);
});

// ------------------------------------------------------------------------- //
// LANDING PAGE EVENTS

if (_checkAbsolutePath("/")) {
  const btn = document.querySelector(".landing-btn");
  const toggler = document.querySelector(".toggler");
  btn.addEventListener("click", e => {
    toggler.checked = true;
  });
}

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
          const period = e.target.alt;
          console.log(period);
          list.filter(period, "reset", listItem => {
            return listItem.firstChild.firstChild.value;
          });
          search.value = "";
          e.preventDefault();
        });
      });
      break;
    case 3: // View Banksia Page
      const map = new Map("view", "mubc-map");
      // Get Banksia ID
      const id = _getPathPart(2);
      // On Page Load
      // document.addEventListener("DOMContentLoaded", e => {
      // Load the Map Component
      map.load(id);
      // });
      break;
    default:
      break;
  }
}

// ------------------------------------------------------------------------- //
// EXPLORE MAP EVENT LISTENERS

if (_checkPath("/map")) {
  const map = new Map("explore", "explore-map");

  document.addEventListener("DOMContentLoaded", e => {
    map.load();
    document
      .getElementById("locate-me")
      .addEventListener("click", e => map.locateUser());
    // document.body.style.backgroundColor = "#f9d63c";
  });
}

// ------------------------------------------------------------------------- //
// EXPLORE ABOUT EVENT LISTENERS

if (_checkPath("/about")) {
  document.addEventListener("DOMContentLoaded", e => {
    document.body.style.backgroundColor = "#7db9ba";
  });
}

// ------------------------------------------------------------------------- //
// VIEW SIGNAGE EVENTS LISTENERS

// if (_checkPath("/signage")) {
//   document.addEventListener("DOMContentLoaded", e => {
//     const body = document.querySelector("body");
//     body.style.backgroundColor = "#434350";
//     body.style.backgroundImage = "url('../img/Dark Background_Small-02.jpg')";
//     body.style.backgroundRepeat = "no-repeat";
//     body.style.backgroundSize = "cover";
//     body.style.backgroundPosition = "center center";
//     body.style.height = "100vh";
//   });
// }

// ------------------------------------------------------------------------- //
// UTILITY FUNCTIONS

// Checks if the current window location is the desired pathname
function _checkPath(pathname) {
  return window.location.pathname.toLowerCase().indexOf(pathname) != -1;
}

// Checks if the absolute current window location is the desired pathname
function _checkAbsolutePath(pathname) {
  return window.location.pathname === pathname;
}

// Returns the num of paths(/) in the window location pathname
function _getPathLength() {
  return window.location.pathname.split("/").length;
}

// Returns the desired part of the pathname
function _getPathPart(index) {
  return window.location.pathname.split("/")[index];
}
