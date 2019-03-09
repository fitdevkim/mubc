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
      const map = new Map("view", "mubc-map");
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
// PAGE TRANSITION WITH BARBA JS
// document.addEventListener("DOMContentLoaded", e => {
//   Barba.Pjax.start();
// });

// var FadeTransition = Barba.BaseTransition.extend({
//   start: function() {
//     /**
//      * This function is automatically called as soon the Transition starts
//      * this.newContainerLoading is a Promise for the loading of the new container
//      * (Barba.js also comes with an handy Promise polyfill!)
//      */

//     // As soon the loading is finished and the old page is faded out, let's fade the new page
//     Promise.all([this.newContainerLoading, this.fadeOut()]).then(
//       this.fadeIn.bind(this)
//     );
//   },

//   fadeOut: function() {
//     /**
//      * this.oldContainer is the HTMLElement of the old Container
//      */

//     return $(this.oldContainer)
//       .animate({ opacity: 0 })
//       .promise();
//   },

//   fadeIn: function() {
//     /**
//      * this.newContainer is the HTMLElement of the new Container
//      * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
//      * Please note, newContainer is available just after newContainerLoading is resolved!
//      */

//     var _this = this;
//     var $el = $(this.newContainer);

//     $(this.oldContainer).hide();

//     $el.css({
//       visibility: "visible",
//       opacity: 0
//     });

//     $el.animate({ opacity: 1 }, 400, function() {
//       /**
//        * Do not forget to call .done() as soon your transition is finished!
//        * .done() will automatically remove from the DOM the old Container
//        */

//       _this.done();
//     });
//   }
// });

// /**
//  * Next step, you have to tell Barba to use the new Transition
//  */

// Barba.Pjax.getTransition = function() {
//   /**
//    * Here you can use your own logic!
//    * For example you can use different Transition based on the current page or link...
//    */

//   return FadeTransition;
// };

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
