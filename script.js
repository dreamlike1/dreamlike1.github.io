const countryOptions = {
    expressPaid: [
        "United States", "Canada", "Australia", "Mexico", "United Kingdom", "Brazil",
        "New Zealand", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus",
        "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany",
        "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania",
        "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania",
        "Slovakia", "Slovenia", "Spain", "Sweden"
    ],
    expressFree: ["Japan", "South Korea"],
    economy: ["United States"],
    standard: [
        "United States", "New Zealand", "Austria", "Bosnia and Herzegovina",
        "Belgium", "Bulgaria", "Croatia", "Czech Republic", "Denmark",
        "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
        "Ireland", "Italy", "Lithuania", "Luxembourg", "Latvia",
        "Netherlands", "Norway", "Poland", "Portugal", "Romania",
        "Slovenia", "Slovakia", "Spain", "Sweden", "Switzerland",
        "United Kingdom", "Brunei", "Hong Kong", "Indonesia", "Macau",
        "Malaysia", "Philippines", "Singapore", "Thailand", "Taiwan",
        "Vietnam", "Anguilla", "Antigua and Barbuda", "Aruba", "Barbados",
        "Bermuda", "Bonaire", "Cayman Islands", "Curaçao", "Dominica",
        "Dominican Republic", "Greenland", "Grenada", "Guadeloupe",
        "Haiti", "Jamaica", "Martinique", "Montserrat", "Puerto Rico",
        "Saint Barthélemy", "Saint Kitts and Nevis", "Saint Lucia",
        "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines",
        "Sint Maarten", "Bahamas", "Trinidad and Tobago", "Turks and Caicos Islands",
        "British Virgin Islands", "U.S. Virgin Islands", "Belize", "Bolivia",
        "Chile", "Colombia", "Costa Rica", "Ecuador", "El Salvador",
        "Falkland Islands", "French Guiana", "Guatemala", "Guyana",
        "Honduras", "Nicaragua", "Panama", "Paraguay", "Peru",
        "South Georgia and the South Sandwich Islands", "Suriname",
        "Uruguay", "Venezuela"
    ],
    collection: ["United States", "Canada"],
};

let holidays = {};

// Fetch holidays for a specific country
async function fetchHolidays(country) {
    const year = new Date().getFullYear();
    const response = await fetch(`https://date.nager.at/api/v2/PublicHolidays/${year}/${country}`);
    if (response.ok) {
        holidays[country] = await response.json();
    } else {
        console.error(`Failed to fetch holidays for ${country}`);
    }
}

// Check if a date is a holiday
function isHoliday(date, country) {
    if (!holidays[country]) return false;
    return holidays[country].some(holiday => 
        new Date(holiday.date).toDateString() === date.toDateString()
    );
}

// Calculate business days, excluding weekends and holidays
function calculateBusinessDays(startDate, numDays, country) {
    let currentDate = new Date(startDate);
    let count = 0;

    while (count < numDays) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6 && !isHoliday(currentDate, country)) {
            count++;
        }
    }
    return currentDate;
}

// Populate country options and fetch holidays
async function populateCountries() {
    const countrySelect = document.getElementById('countrySelect');
    const selectedService = document.getElementById('serviceType').value;
    const countries = countryOptions[selectedService];

    countrySelect.innerHTML = '';
    const holidayFetchPromises = [];

    for (const country of countries) {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
        holidayFetchPromises.push(fetchHolidays(country)); // Collect promises
    }

    await Promise.all(holidayFetchPromises); // Wait for all holidays to be fetched
}

document.getElementById('serviceType').addEventListener('change', populateCountries);

async function calculateBusinessDate() {
    const dateRangeInput = document.getElementById('businessDays').value;
    const selectedCountry = document.getElementById('countrySelect').value;

    if (!dateRangeInput || isNaN(dateRangeInput) || !selectedCountry) {
        alert('Please enter a valid number of business days and select a country.');
        return;
    }

    const startDate = new Date(document.getElementById('startDate').value);
    const numDays = parseInt(dateRangeInput);

    const endDate = calculateBusinessDays(startDate, numDays, selectedCountry);
    document.getElementById('result').value = `End Date: ${endDate.toLocaleDateString()}`;
}

document.getElementById('calculateButton').addEventListener('click', calculateBusinessDate);

// Copy result to clipboard
document.getElementById('result').addEventListener('click', () => {
    const resultField = document.getElementById('result');
    navigator.clipboard.writeText(resultField.value).then(() => {
        const copyMessage = document.getElementById('copyMessage');
        copyMessage.style.display = 'block';
        setTimeout(() => {
            copyMessage.style.display = 'none';
        }, 2000);
    });
});

// Initial population of countries
populateCountries();
