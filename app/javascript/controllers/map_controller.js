import { Controller } from "@hotwired/stimulus"
import L from "leaflet"

// Connects to data-controller="map"
export default class extends Controller {
  static outlets = ["location"]
  static targets = ["container"]
  static values = {
    icon: String
  }

  // lifecycle

  connect() {
    this.createMap()
    this.setSelectedLocation({ detail: { location: this.locationOutlet } })
    this.initializeLocations()
  }

  disconnect() {
    this.map.remove()
  }

  // actions

  createMap() {
    this.map = L.map(this.containerTarget)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  initializeLocations() {
    if (this.hasLocationOutlet) {
      this.locationOutlets.forEach(location => {
        this.addCircle(location.latValue, location.lonValue)
      })
    }
  }

  setSelectedLocation({ detail: { location } }) {
    if (this.selectedLocationMarker instanceof L.Marker) {
      this.map.removeLayer(this.selectedLocationMarker)
    }

    const customIcon = L.icon({
      iconUrl: this.iconValue,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    })
    this.selectedLocationMarker = L.marker([location.latValue, location.lonValue], { icon: customIcon })

    this.selectedLocationMarker.addTo(this.map)
    this.map.setView([location.latValue, location.lonValue], 17)
  }

  // helpers

  addCircle(lat, lon) {
    L.circle([lat, lon], {
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.5,
      radius: 5
    }).addTo(this.map);
  }
}
