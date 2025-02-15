import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="location"
export default class extends Controller {
  static targets = ["location"]
  static values = {
    lat: Number,
    lon: Number
  }

  selectLocation() {
    this.dispatch("selectLocation", { detail: { location: this } })
  }
}
