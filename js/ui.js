import { countryOptions } from './api/countryData.js';
import { fetchHolidays } from './api/holidays.js'; // Updated path
import { calculateBusinessDays, formatDate } from './dateUtils.js'; // Directly import functions

// Assume holidays are stored globally or in a shared state
let holidays = [];

export async function populateCountries() {
    const countrySelect = document.getElementById('countrySelect');
    const selectedService = document.getElementById('serviceType').value;
    const countries = countryOptions[selectedService] || [];

    countrySelect.innerHTML = '<option value="">Select a country</option>'; // Add default option

    for (const country of countries) {
        // Fetch holidays and update global holidays array
        holidays = await fetchHolidays(country, new Date().getFullYear());
    }

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

export async function calculateBusinessDate() {
    let startDate = new Date(document.getElementById('startDate').value);
    const dateRangeInput = document.getElementById('businessDays').value;
    const selectedCountry = document.getElementById('countrySelect').value;
    const past5pmCheckbox = document.getElementById('cbx-42');

    if (!dateRangeInput || !selectedCountry || isNaN(startDate.getTime())) {
        alert('Please enter a valid start date, range of business days, and select a country.');
        return;
    }

    // Add one day if the checkbox is ticked
    if (past5pmCheckbox.checked) {
        startDate.setDate(startDate.getDate() + 1);
    }

    let numDaysStart, numDaysEnd;

    // Handle different range formats
    if (dateRangeInput.includes('-')) {
        const ranges = dateRangeInput.split('-').map(Number);
        numDaysStart = ranges[0];
        numDaysEnd = ranges[1];
    } else if (dateRangeInput.includes(',')) {
        const ranges = dateRangeInput.split(',').map(Number);
        numDaysStart = ranges[0];
        numDaysEnd = ranges[1];
    } else {
        numDaysStart = numDaysEnd = Number(dateRangeInput);
    }

    // Fetch holidays for the selected country
    holidays = await fetchHolidays(selectedCountry, startDate.getFullYear());

    // Calculate the end dates considering holidays
    const endDateStart = calculateBusinessDays(startDate, numDaysStart, selectedCountry);
    const endDateEnd = calculateBusinessDays(startDate, numDaysEnd, selectedCountry);

    const formattedStart = formatDate(endDateStart);
    const formattedEnd = formatDate(endDateEnd);

    document.getElementById('result').value = `Between ${formattedStart} and ${formattedEnd}`;
}

export function setupEventListeners() {
    document.getElementById('serviceType').addEventListener('change', populateCountries);
    document.getElementById('calculateButton').addEventListener('click', calculateBusinessDate);
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
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    populateCountries();
    setupEventListeners();
});
