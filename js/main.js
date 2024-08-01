// js/main.js
import { populateCountries, setupEventListeners } from './ui.js';
import { setupSwitchButton } from './switch.js'; // Import the switch button setup function
import { initializeTimezone } from './timezone/timezone.js'; // Import the timezone initialization function

document.addEventListener('DOMContentLoaded', () => {
    populateCountries();
    setupEventListeners();
    setupSwitchButton(); // Initialize the switch button functionality
    initializeTimezone(); // Initialize the timezone functionality
});
