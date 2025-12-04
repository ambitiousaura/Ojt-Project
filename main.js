// Entry point module.
// Waits for the DOM to be ready, then starts the app.

import { initApp } from "./uii.js";

document.addEventListener("DOMContentLoaded", function () {
  initApp();
});

