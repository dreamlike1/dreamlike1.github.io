// js/main.js
import { populateCountries, setupEventListeners } from './ui.js';
import { setupSwitchButton } from './switch.js'; // Import the switch button setup function

document.addEventListener('DOMContentLoaded', () => {
    populateCountries();
    setupEventListeners();
    setupSwitchButton(); // Initialize the switch button functionality
});
