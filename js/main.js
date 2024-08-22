import { populateCountries } from './ui/countryUtils.js';
import { setupEventListeners } from './eventHandlers/eventHandlers.js';
import { setupSwitchButton } from './switch/switch.js';
import { initializeTimezone } from './timezone/timezone.js';
import { initializeDateSelector } from './calendar/calendar.js'; // Import the date selector module
import { initializeResultsVisibility } from './resultsVisibility/resultsVisibility.js'; // Import the new module

document.addEventListener('DOMContentLoaded', () => {
    const defaultServiceType = 'expressPaid'; // Default service type

    // Function to set today's date
    function setTodayDate() {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        document.getElementById('couponDate').value = formattedDate;
    }

    // Initialize Semantic UI dropdowns
    $('.ui.dropdown').dropdown();

    // Populate countries dropdown and fetch holidays based on default serviceType
    populateCountries(defaultServiceType).then(() => {
        $('#countrySelect').dropdown('refresh'); // Ensure dropdown is refreshed
    });

    setupEventListeners(); // Setup event listeners for UI elements
    setupSwitchButton(); // Initialize the switch button functionality
    initializeTimezone(); // Initialize the timezone functionality
    initializeDateSelector(); // Initialize the date selector functionality
    initializeResultsVisibility(); // Initialize results visibility logic

    // Set today's date as default value for couponDate input
    setTodayDate();
});
