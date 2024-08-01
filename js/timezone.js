// js/timezone.js

// Function to update the timezone display
export function updateTimezoneDisplay(selectedCountryTimezone) {
    const timezoneElement = document.getElementById('timezoneText');
    const userLocalTime = new Date();
    
    if (selectedCountryTimezone) {
        // Convert user's local time to UTC
        const utcTime = userLocalTime.toISOString();
        
        // Convert UTC time to selected timezone
        const options = { timeZone: selectedCountryTimezone, timeZoneName: 'short' };
        const convertedTime = new Intl.DateTimeFormat('en-US', options).format(new Date(utcTime));
        
        timezoneElement.textContent = `Current Time in ${selectedCountryTimezone}: ${convertedTime}`;
    } else {
        // No country selected; show placeholder text
        timezoneElement.textContent = `Current Timezone in User's Local Time: ${userLocalTime.toLocaleString()}`;
    }
}

// Function to handle the country change event
export function onCountryChange(event) {
    const selectedCountryTimezone = event.target.value;
    updateTimezoneDisplay(selectedCountryTimezone);
}

// Function to initialize the timezone display
export function initializeTimezone() {
    const startDateInput = document.getElementById('startDate');
    const timezoneElement = document.createElement('div');
    timezoneElement.id = 'timezoneText'; // Unique ID for the timezone text
    timezoneElement.classList.add('timezone-text'); // Add the CSS class
    startDateInput.parentElement.appendChild(timezoneElement); // Add the timezone text below the startDate input

    const countrySelect = document.getElementById('countrySelect');
    if (countrySelect) {
        countrySelect.addEventListener('change', onCountryChange);
        updateTimezoneDisplay(countrySelect.value);
    } else {
        // If country select is not found, initialize with empty
        updateTimezoneDisplay(null);
    }
}
