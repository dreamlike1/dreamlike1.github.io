// Function to update the timezone display
function updateTimezoneDisplay(selectedCountryTimezone) {
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
function onCountryChange(event) {
    const selectedCountryTimezone = event.target.value;
    updateTimezoneDisplay(selectedCountryTimezone);
}

// Event listener for DOMContentLoaded to set up the country change listener
document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('countrySelect');
    if (countrySelect) {
        countrySelect.addEventListener('change', onCountryChange);
    }

    // Create and style the timezone text element
    const startDateInput = document.getElementById('startDate');
    const timezoneElement = document.createElement('div');
    timezoneElement.id = 'timezoneText'; // Unique ID for the timezone text
    timezoneElement.classList.add('timezone-text'); // Add the CSS class
    startDateInput.parentElement.appendChild(timezoneElement); // Add the timezone text below the startDate input

    // Set initial timezone display
    updateTimezoneDisplay(countrySelect ? countrySelect.value : null);
});
