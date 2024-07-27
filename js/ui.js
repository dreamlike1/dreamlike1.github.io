// js/ui.js
import { countryOptions } from './api/countryData.js';
import { fetchHolidays } from './api/holidays.js'; // Updated path
import { calculateBusinessDays, formatDate } from './dateUtils.js';

export async function populateCountries() {
    const countrySelect = document.getElementById('countrySelect');
    const selectedService = document.getElementById('serviceType').value;
    const countries = countryOptions[selectedService] || [];

    countrySelect.innerHTML = '<option value="">Select a country</option>'; // Add default option
    
    for (const country of countries) {
        await fetchHolidays(country, new Date().getFullYear());
    }

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

export async function calculateBusinessDate() {
    const dateRangeInput = document.getElementById('businessDays').value;
    const selectedCountry = document.getElementById('countrySelect').value;

    if (!dateRangeInput || !selectedCountry) {
        alert('Please enter a valid range of business days and select a country.');
        return;
    }

    const startDate = new Date(document.getElementById('startDate').value);
    const ranges = dateRangeInput.split('-').map(Number);
    const numDaysStart = ranges[0];
    const numDaysEnd = ranges[1] || ranges[0];

    await fetchHolidays(selectedCountry, startDate.getFullYear());

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
