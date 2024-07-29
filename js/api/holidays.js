import { countryCodeMapping } from './countryData.js';
import { fetchHolidaysFromLocalAPI } from './holidaysAPI.js';

// Store holidays data with a cache
const holidaysCache = new Map();

// Function to fetch holidays and cache the results
export async function fetchHolidays(country, year) {
    const countryCode = countryCodeMapping[country];
    if (!countryCode) {
        console.error(`No country code found for ${country}`);
        return [];
    }

    // Return cached data if available
    if (holidaysCache.has(country)) {
        return holidaysCache.get(country);
    }

    try {
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch holidays from Date Nager API: ${response.statusText}`);
        }

        const responseText = await response.text();
        
        // Log an empty response as a warning
        if (!responseText.trim()) {
            console.warn(`Empty response from Date Nager API for ${country}`);
            data = [];
        } else {
            let data;
            try {
                data = JSON.parse(responseText); // Attempt to parse JSON
            } catch (error) {
                console.error(`Error parsing JSON from Date Nager API for ${country}:`, error);
                data = [];
            }

            // If data is not valid, fall back to local API
            if (!Array.isArray(data) || data.length === 0) {
                console.warn(`No holiday data from Date Nager API for ${country}, trying local Holidays API...`);
                data = await fetchHolidaysFromLocalAPI(countryCode, year);
            }

            // Store the result in cache
            holidaysCache.set(country, data);
            return data; // Ensure the result is returned
        }
    } catch (error) {
        console.error(`Error fetching holidays for ${country}:`, error);
        return []; // Return an empty array on error
    }
}

// Function to check if a given date is a holiday in a specified country
export function isHoliday(date, country) {
    const countryHolidays = holidaysCache.get(country) || [];
    return countryHolidays.some(holiday => 
        new Date(holiday.date).toDateString() === date.toDateString()
    );
}

// Function to filter countries without holidays and save results in an array
export async function filterCountriesWithoutHolidays(year) {
    const countries = Object.keys(countryCodeMapping);
    const fetchPromises = countries.map(country => fetchHolidays(country, year));

    // Fetch holidays for all countries in parallel
    await Promise.all(fetchPromises);

    // Filter countries that have no holidays
    const countriesWithoutHolidays = countries.filter(country => 
        !(holidaysCache.get(country) || []).length
    );

    return countriesWithoutHolidays;
}

// Example usage of the functions
(async () => {
    const year = 2024;
    const result = await filterCountriesWithoutHolidays(year);
    console.log('Countries without holidays:', result); // Log the result succinctly
})();
