// admin.js (Front-End Javascript)

// ------------------------------------------------------------------------- //
// ADD/EDIT BANKSIA - ADD EVENT LISTENER
//  > If 'Others' is selected for the group input

// Gets group input HTML element
const group = document.querySelector("#group");

// Checks if HTML element exist
if (group) {
  // Adds Event listener to the input HTML element
  group.addEventListener("change", _checkOtherGroup);
}

// ------------------------------------------------------------------------- //
// ADD SEARCH EVENT LISTENERS
const search = document.getElementById("search");
if (search) {
  const list = new List(".list-group", ".list-group-item");
  list.init();
  search.addEventListener("keyup", e => {
    const input = e.target.value;
    list.filter(input, "", listItem => {
      return listItem.firstChild.firstChild.textContent.toLowerCase();
    });
    e.preventDefault();
  });
}

// ------------------------------------------------------------------------- //
// INIT MAP OBJECT FOR BANKSIA AND SIGNAGE EDIT PAGES

// Checks if page path is of banksia or signage
if (_checkPath("/admin/banksia") || _checkPath("/admin/signage")) {
  // Check the Path length
  switch (_getPathLength()) {
    case 4: // Path length 4 is where there is the Banksia/Signage id
      // Get Banksia ID
      const id = _getPathPart(3);
      // Ensures path is an id
      if (id === "add" || id === "edit") {
        break;
      } else {
        // Init Map controller
        const map = new Map("admin", "mapid");
        // Load the Map Component
        map.load(id);

        // Fix Map Load Issue
        setTimeout(() => {
          document.getElementById("geolocations").className = "tab-pane fade";
        }, 50);
      }
      break;

    default:
      break;
  }
}

// ------------------------------------------------------------------------- //
// ADMIN BANKSIA & SIGNAGE DELETE AJAX REQUESTS

// Add event listeners to delete buttons
$(document).ready(() => {
  $(".delete-banksia").on("click", e => {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/admin/banksia/" + id,
      success: response => {
        window.location.href = "/admin/banksia";
      },
      error: err => {
        console.log(err);
      }
    });
  });

  $(".delete-signage").on("click", e => {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/admin/signage/" + id,
      success: response => {
        window.location.href = "/admin/signage";
      },
      error: err => {
        console.log(err);
      }
    });
  });
});

// ------------------------------------------------------------------------- //
// UTILITY FUNCTIONS

// A function that checks if "Other" is selected in group input
function _checkOtherGroup() {
  // Gets otherGroupName input HTML element
  const otherGroupName = document.querySelector("#otherGroupName");
  // If group is "Others"
  if (group.options[group.selectedIndex].value === "Others") {
    // Enable the otherGroupName input
    otherGroupName.disabled = false;
    // Set otherGroupName placeholder message
    otherGroupName.placeholder = "Enter Other Group name";
    // Set otherGroupName as required
    otherGroupName.required = true;
  } else {
    // Disable the otherGroupName input
    otherGroupName.disabled = true;
    // Ensure the otherGroupName value is empty
    otherGroupName.value = "";
    // Set the otherGroupName placeholder to empty
    otherGroupName.placeholder = "";
    // Set otherGroupName as not required
    otherGroupName.required = false;
  }
}

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
