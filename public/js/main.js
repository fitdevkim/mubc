// main.js (Front-End Javascript)

// Page animation
document.addEventListener("DOMContentLoaded", e => {
  const bodyStyle = document.querySelector(".mubc-bg .container").style;
  bodyStyle.opacity = "1";
  bodyStyle.transition = "1s opacity";
});

// ------------------------------------------------------------------------- //
// LANDING PAGE EVENTS

if (_checkAbsolutePath("/")) {
  const btn = document.querySelector(".landing-btn");
  const toggler = document.querySelector(".toggler");
  btn.addEventListener("click", e => {
    toggler.checked = true;
  });
  document.body.style.backgroundColor = "#7db9ba";
}

// ------------------------------------------------------------------------- //
// EXPLORE BANKSIA EVENT LISTENERS

// Check if path is /banksia
if (_checkPath("/banksia")) {
  switch (_getPathLength()) {
    case 2: // Banksia List Page
      // Init Banksia List
      const list = new List(".banksia-list", ".banksia-list-item");
      list.init();

      const search = document.getElementById("search");
      const seasonFilters = document.querySelectorAll(".season");
      const group = document.getElementById("group");

      search.addEventListener("keyup", e => {
        const input = e.target.value;
        list.filter(input, "", listItem => {
          return listItem.firstChild.lastChild.textContent;
        });
        group.value = "Filter by Group";
        _resetSeasonsUI();
        e.preventDefault();
      });

      group.addEventListener("change", e => {
        const grp = e.target.value;
        list.filter(grp, "Filter by Group", listItem => {
          return listItem.firstChild.firstChild.nextSibling.value;
        });
        _resetSeasonsUI();
        search.value = "";
        e.preventDefault();
      });

      seasonFilters.forEach(season => {
        season.addEventListener("click", e => {
          const period = e.target.parentElement.id;
          _resetSeasonsUI();
          if (period !== "reset") {
            e.target.parentElement.firstChild.className = "shadow rounded-circle";
            e.target.parentElement.className = "season active";
            document.getElementById("season-title").style.opacity = 1;
          }

          list.filter(period, "reset", listItem => {
            return listItem.firstChild.firstChild.value;
          });
          search.value = "";
          group.value = "Filter by Group";
          e.preventDefault();
        });
      });
      break;
    case 3: // View Banksia Page
      const map = new Map("view", "mubc-map");
      // Get Banksia ID
      const id = _getPathPart(2);
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
    document.body.style.backgroundColor = "#f9d63c";
  });
}

// ------------------------------------------------------------------------- //
// EXPLORE ABOUT EVENT LISTENERS

if (_checkPath("/about")) {
  document.addEventListener("DOMContentLoaded", e => {
    document.body.style.backgroundColor = "#7db9ba";
  });

  document.getElementById("contact-submit").addEventListener("click", e => {
    const body = document.querySelector(
      "#contact-tab .about-section .about-section-body"
    );
    const dl = document.querySelector(".about-section-body dl");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const msgInput = document.getElementById("message");
    const div = document.createElement("div");

    if (nameInput.value === "" || emailInput.value === "" || msgInput.value === "") {
      div.className = "alert alert-danger";
      div.appendChild(document.createTextNode("Please enter fields"));
    } else {
      nameInput.value = "";
      emailInput.value = "";
      msgInput.value = "";
      div.className = "alert alert-success";
      div.appendChild(document.createTextNode("Message Sent"));
    }

    body.insertBefore(div, dl);

    setTimeout(() => {
      div.remove();
    }, 3000);

    e.preventDefault();
  });
}

// ------------------------------------------------------------------------- //
// VIEW SIGNAGE EVENTS LISTENERS

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

// Reset all season UI
function _resetSeasonsUI() {
  document.querySelectorAll(".season").forEach(s => {
    s.className = "season";
  });
  document.getElementById("season-title").style.opacity = 0.5;
}
