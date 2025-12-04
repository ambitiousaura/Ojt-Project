// Entry point module.
// Waits for the DOM to be ready, then starts the app.

import { initApp } from "./ui.js";

document.addEventListener("DOMContentLoaded", function () {
  initApp();
});