// js/timezone.js
import { capitalTimeZones } from './capitals.js';

// Function to update the timezone display
export function updateTimezoneDisplay(selectedCountry) {
    const timezoneElement = document.getElementById('timezoneText');
    const userLocalTime = new Date();

    // Get the time zone for the capital of the selected country
    const selectedCountryTimezone = capitalTimeZones[selectedCountry];

    if (selectedCountryTimezone) {
        // Convert user's local time to UTC
        const utcTime = userLocalTime.toISOString();

        // Convert UTC time to selected timezone
        const options = { 
            timeZone: selectedCountryTimezone,
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        };
        const convertedTime = new Intl.DateTimeFormat('en-US', options).format(new Date(utcTime));

        timezoneElement.textContent = `Current Time in Capital of ${selectedCountry}: ${convertedTime}`;
    } else {
        // No valid time zone; show placeholder text
        const localTime = userLocalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timezoneElement.textContent = `Current Time in User's Local Time: ${localTime}`;
    }
}

// Function to handle the country change event
export function onCountryChange(event) {
    const selectedCountry = event.target.value;
    updateTimezoneDisplay(selectedCountry);
}

// Function to initialize the timezone display
export function initializeTimezone() {
    const startDateInput = document.getElementById('startDate');
    const timezoneElement = document.getElementById('timezoneText'); // Get the existing timezone text element
    
    if (!timezoneElement) {
        // If timezone text element does not exist, create it
        const timezoneTextElement = document.createElement('p');
        timezoneTextElement.id = 'timezoneText'; // Unique ID for the timezone text
        timezoneTextElement.classList.add('timezone-text'); // Add the CSS class
        startDateInput.parentElement.appendChild(timezoneTextElement); // Add the timezone text below the startDate input
    }
    
    const countrySelect = document.getElementById('countrySelect');
    if (countrySelect) {
        countrySelect.addEventListener('change', onCountryChange);
        updateTimezoneDisplay(countrySelect.value);
    } else {
        // If country select is not found, initialize with empty
        updateTimezoneDisplay(null);
    }
}
