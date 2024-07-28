import { countryCodeMapping } from './countryData.js';

// Store holidays data
export let holidays = {};

// Function to fetch holidays from Date Nager API
async function fetchFromDateNagerAPI(countryCode, year) {
    try {
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch holidays from Date Nager API: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching holidays from Date Nager API:`, error);
        throw error;
    }
}

// Function to fetch holidays
export async function fetchHolidays(country, year) {
    const countryCode = countryCodeMapping[country];
    if (!countryCode) {
        console.error(`No country code found for ${country}`);
        return;
    }

    try {
        const data = await fetchFromDateNagerAPI(countryCode, year);

        if (Array.isArray(data)) {
            holidays[country] = data;
        } else {
            console.warn(`No holiday data available for ${country}`);
        }
    } catch (error) {
        console.error(`Error fetching holidays for ${country}:`, error);
    }
}

// Function to check if a given date is a holiday in a specified country
export function isHoliday(date, country) {
    if (!holidays[country]) {
        return false;
    }
    return holidays[country].some(holiday =>
        new Date(holiday.date).toDateString() === date.toDateString()
    );
}
