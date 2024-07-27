// js/main.js
import { populateCountries, setupEventListeners } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    populateCountries();
    setupEventListeners();
});
