import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="location"
export default class extends Controller {
  static targets = ["location"]
  static values = {
    lat: Number,
    lon: Number,
    broadcasted: Boolean
  }

  connect() {
    if (this.broadcastedValue) {
      this.removeLastLocation()
    }
  }

  disconnect() {
  }

  selectLocation() {
    this.dispatch("selectLocation", { detail: { location: this } })
  }

  removeLastLocation() {
    const locations = Array.from([...document.querySelectorAll(".location")])
    const locationToRemove = locations.pop()
    locationToRemove.remove()
  }
}
