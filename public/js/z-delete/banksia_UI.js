// banksia_UI.js (banksia view object)
// This class focusses on the HTML elements of the banksia object

class BanksiaUI {
  // Constructor gets all the HTML element that is required for the banksia object
  constructor() {
    this.name = document.getElementById("b-name");
    this.commonTitle = document.getElementById("b-common-title");
    this.common = document.getElementById("b-common");
    this.noongarTitle = document.getElementById("b-noongar-title");
    this.noongar = document.getElementById("b-noongar");
    this.desc = document.getElementById("b-desc");
    this.habitat = document.getElementById("b-habitat");
    this.flower = document.getElementById("b-flower");
    this.group = document.getElementById("b-group");
    this.period = document.getElementById("b-period");
    this.carouselIndicators = document.querySelector(".carousel-indicators");
    this.carouselImages = document.querySelector(".carousel-inner");
  }

  // Sets the banksia value to the HTML elements
  // & adds the image src to carousel components
  paint(banksia) {
    // Sets the banksia HTML element values
    this.set(banksia);
    // Iterate through the banksia img array
    banksia.img.forEach((img, index) => {
      // Creates the carousel Indicator
      this.createCarouselIndicator(index);
      // Creates the carousel image with the img src
      this.createCarouselItem(img, index);
    });
  }

  // Create a carousel indicatior HTML element
  createCarouselIndicator(index) {
    // Create list item element
    const li = document.createElement("li");
    // If first index, sets active class to class name
    if (index === 0) li.className = "active";
    // Set carousel attributes
    li.setAttribute("data-target", "#carousel");
    li.setAttribute("data-slide-to", index);
    // Append the list item to the unordered list carousel indicators
    this.carouselIndicators.appendChild(li);
  }

  // Create an image carousel HTML element
  createCarouselItem(imgPath, index) {
    // Create div element
    const div = document.createElement("div");
    // Create img element
    const img = document.createElement("img");
    // Checks if first index
    if (index === 0) {
      // Sets div class name with active class
      div.className = "carousel-item active";
    } else {
      // Sets div class name
      div.className = "carousel-item";
    }

    // Set img classname
    img.className = "d-block w-100";
    // Set img styles
    img.style.height = "280px";
    img.style.objectFit = "cover";
    // Set img src
    img.src = `/uploads/${imgPath}`;
    // Append img element to div element
    div.appendChild(img);
    // Append div elemnet to carousel element
    this.carouselImages.appendChild(div);
  }

  // Setter function that sets all the banksia information
  set(banksia) {
    // Set banksia name to HTML element value
    this.name.textContent = banksia.name;
    // Checks if common name is empty
    if (banksia.commonName === "") {
      // If empty, hide the common name labels
      this.commonTitle.style.display = "none";
      this.common.style.display = "none";
    } else {
      // Else, set banksia common name to HTML element value
      this.common.textContent = banksia.commonName;
    }
    // Checks if noongar name is empty
    if (banksia.noongarName === "") {
      // If empty, hide the noongar name labels
      this.noongarTitle.style.display = "none";
      this.noongar.style.display = "none";
    } else {
      // Else, set noongar name to HTML element value
      this.noongar.textContent = banksia.noongarName;
    }
    // Set banksia description to HTML element value
    this.desc.textContent = banksia.desc;
    // Set banksia habitat description to HTML element value
    this.habitat.textContent = banksia.habitatDesc;
    // Set banksia flower description to HTML element value
    this.flower.textContent = banksia.flowerDesc;
    // Checks if banksia group is not "Others"
    if (banksia.group !== "Others") {
      // If true, set banksia group to HTML element value
      this.group.textContent = banksia.group;
    } else {
      // Else, set "Others" banksia group including the other group name
      this.group.textContent = `${banksia.group} (${banksia.otherGroupName})`;
    }
    // Set banksia flowering period to HTML element value
    this.period.textContent = banksia.period;
  }
}
