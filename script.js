const countryOptions = {
    expressPaid: [
        // list of countries
    ],
    expressFree: ["Japan", "South Korea"],
    economy: ["United States"],
    standard: [
        // list of countries
    ],
    collection: ["Canada", "United States"],
};

let holidays = {};

// Fetch holidays for a specific country and year
async function fetchHolidays(country, year) {
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

// Format date to a string with month names
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
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
    for (const country of countries) {
        const year = new Date().getFullYear();
        await fetchHolidays(country, year); // Fetch holidays for each country
    }

    const filteredCountries = countries.filter(country => !holidays[country] || holidays[country].length === 0);
    filteredCountries.sort();

    for (const country of filteredCountries) {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }
}

document.getElementById('serviceType').addEventListener('change', populateCountries);

async function calculateBusinessDate() {
    const dateRangeInput = document.getElementById('businessDays').value;
    const selectedCountry = document.getElementById('countrySelect').value;

    if (!dateRangeInput || !selectedCountry) {
        alert('Please enter a valid range of business days and select a country.');
        return;
    }

    const startDate = new Date(document.getElementById('startDate').value);
    const ranges = dateRangeInput.split('-').map(Number);
    const numDaysStart = ranges[0];
    const numDaysEnd = ranges[1] || ranges[0]; // Handle single number input

    await fetchHolidays(selectedCountry, startDate.getFullYear()); // Fetch holidays for selected year

    const endDateStart = calculateBusinessDays(startDate, numDaysStart, selectedCountry);
    const endDateEnd = calculateBusinessDays(startDate, numDaysEnd, selectedCountry);

    const formattedStart = formatDate(endDateStart);
    const formattedEnd = formatDate(endDateEnd);

    document.getElementById('result').value = `Between ${formattedStart} and ${formattedEnd}`;
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
