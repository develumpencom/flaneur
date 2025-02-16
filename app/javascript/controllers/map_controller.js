import { Controller } from "@hotwired/stimulus"
import L from "leaflet"

// Connects to data-controller="map"
export default class extends Controller {
  static outlets = ["location"]
  static targets = ["container"]
  static values = {
    icon: String
  }

  selectedLocationMarker = undefined
  circles = {}

  // lifecycle

  connect() {
    this.createMap()
    this.setSelectedLocation({ detail: { location: this.locationOutlet } })
    this.initializeLocationCircles()
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

  initializeLocationCircles() {
    if (this.hasLocationOutlet) {
      this.locationOutlets.forEach(location => {
        this.addLocationCircle(location)
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

  addLocationCircle(location) {
    const newCircle = this.addCircle(location.latValue, location.lonValue)
    this.circles[location.element.id] = newCircle
    newCircle.addTo(this.map)
  }

  removeLocationCircle(elementId) {
    const circleToRemove = this.circles[elementId]
    this.map.removeLayer(circleToRemove)
    delete this.circles[elementId]
  }

  // events

  addLocation({ detail: { location } }) {
    this.addLocationCircle(location)
  }

  removeLocation({ detail: { elementId } }) {
    this.removeLocationCircle(elementId)
  }

  // helpers

  addCircle(lat, lon) {
    return L.circle([lat, lon], {
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.5,
      radius: 5
    })
  }
}
