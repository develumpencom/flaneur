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
      this.dispatch("addLocation", { detail: { location: this } })
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

    // I tried to fire this event from disconnect() but looks like the element
    // is already removed from the DOM.
    this.dispatch("removeLocation", { detail: { elementId: locationToRemove.id } })

    locationToRemove.remove()
  }
}
