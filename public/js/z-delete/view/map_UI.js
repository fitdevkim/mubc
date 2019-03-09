class MapUI {
  constructor(type, id, config) {
    this.type = type;
    this.id = id;
    // const nw = config.bounds.nw;
    // const se = config.bounds.se;
    // var p1 = L.latLng(nw.lat, nw.lng),
    //   p2 = L.latLng(se.lat, se.lng),
    //   bounds = L.latLngBounds(p1, p2);
    this.map = L.map(id, {
      // bounds: bounds,
      center: config.center,
      zoom: config.zoom
    });

    L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    }).addTo(this.map);

    this.map.setMaxBounds(this.map.getBounds());
  }

  paintMarker(geo, banksia, index) {
    this.drawPoint(geo, banksia, index);
  }

  drawPoint(geo, obj, index) {
    const marker = L.marker([geo.lat, geo.lng]);
    if (this.type === "admin") {
      marker.bindPopup(this.getAdminMarkerPopUp(geo, index));
    } else if (this.type === "explore") {
      if (geo.type === "banksia") {
        marker.bindPopup(this.getBanksiaMarkerPopUp(obj));
      } else if (geo.type === "signage") {
        marker.bindPopup(this.getSignageMarkerPopUp(obj));
      }
    }
    marker.addTo(this.map);
  }

  getAdminMarkerPopUp(geo, index) {
    return `
      Latitude: ${geo.lat}<br> 
      Longtitude: ${geo.lng}<br>
      <button 
        style='color:white;' 
        class='btn btn-danger btn-sm btn-block mt-1 delete-geo' 
        data-toggle='modal' 
        data-target='#geo-${index}'
      >Delete Point</button>`;
  }

  getBanksiaMarkerPopUp(banksia) {
    return `
      <a href="/banksia/${banksia._id}">
        <h6 class="text-center">${banksia.name}</h6>
        <img src="/uploads/${banksia.img[0]}" class="img-thumbnail">
      </a>`;
  }

  getSignageMarkerPopUp(signage) {
    return signage.name;
  }

  // createAdminModalDialog(geo, index) {
  //   const map = document.getElementById(this.id);
  //   // Create modal div element
  //   const modal = document.createElement("div");
  //   modal.className = "modal fade";
  //   modal.id = `geo-${index}`;
  //   modal.tabIndex = "-1";
  //   modal.setAttribute("role", "dialog");
  //   modal.setAttribute("aria-labelledby", geo);
  //   modal.setAttribute("aria-hidden", "true");

  //   // Create modal dialog div element
  //   const dialog = document.createElement("div");
  //   dialog.className = "modal-dialog";
  //   dialog.setAttribute("role", "document");

  //   // Create modal content div element
  //   const content = document.createElement("div");
  //   content.className = "modal-content";

  //   // Create modal header div element
  //   const header = document.createElement("div");
  //   const title = document.createElement("h5");
  //   const closeBtn = document.createElement("button");
  //   const closeSpan = document.createElement("span");
  //   header.className = "modal-header";
  //   title.className = "modal-title";
  //   title.id = "del-img-title";
  //   title.appendChild(document.createTextNode("Delete Geolocation Point"));
  //   closeBtn.className = "close";
  //   closeBtn.type = "button";
  //   closeBtn.setAttribute("data-dismiss", "modal");
  //   closeBtn.setAttribute("aria-label", "Close");
  //   closeSpan.setAttribute("aria-hidden", "true");
  //   closeSpan.appendChild(document.createTextNode("x"));
  //   closeBtn.appendChild(closeSpan);
  //   header.appendChild(title);
  //   header.appendChild(closeBtn);

  //   // Create modal body div element
  //   const body = document.createElement("div");
  //   body.className = "modal-body";
  //   body.appendChild(
  //     document.createTextNode(
  //       "You are about to delete this geolocation. Are you sure?"
  //     )
  //   );

  //   // Create modal footer div element
  //   const footer = document.createElement("div");
  //   const closeFooterBtn = document.createElement("button");
  //   const form = document.createElement("form");
  //   const deleteBtn = document.createElement("button");
  //   footer.className = "modal-footer";
  //   closeFooterBtn.className = "btn btn-secondary";
  //   closeFooterBtn.type = "button";
  //   closeFooterBtn.setAttribute("data-dismiss", "modal");
  //   closeFooterBtn.appendChild(document.createTextNode("Close"));
  //   form.method = "POST";
  //   form.action = `/admin/geo/${geo.type}/${geo.refid}/delete/${geo._id}`;
  //   deleteBtn.className = "btn btn-danger";
  //   deleteBtn.appendChild(document.createTextNode("Delete"));
  //   form.appendChild(deleteBtn);
  //   footer.appendChild(closeFooterBtn);
  //   footer.appendChild(form);

  //   // Append modal content divs
  //   content.appendChild(header);
  //   content.appendChild(body);
  //   content.appendChild(footer);

  //   // Append modal dialog div
  //   dialog.appendChild(content);
  //   // Append modal div
  //   modal.appendChild(dialog);
  //   // Append to HTML
  //   map.appendChild(modal);
  // }

  locateUser() {
    this.map.locate({ setView: true });
  }
}
