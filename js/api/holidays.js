import { countryCodeMapping } from './countryData.js';
import { fetchHolidaysFromLocalAPI } from './holidaysAPI.js'; 

// Cache for storing fetched holiday data
const holidaysCache = new Map();

// Utility function to handle API responses
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const responseText = await response.text();
        if (!responseText) {
            console.warn('Received empty response');
            return null;
        }
        return JSON.parse(responseText);
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null;
    }
}

// Fetch holidays from Date Nager API
async function fetchFromDateNagerAPI(countryCode, year) {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
    return fetchData(url);
}

// Fetch holidays from local API
async function fetchFromHolidaysAPI(countryCode, year) {
    try {
        return await fetchHolidaysFromLocalAPI(countryCode, year);
    } catch (error) {
        console.error(`Error fetching holidays from local API for ${countryCode}:`, error);
        return [];
    }
}

// Fetch and store holidays with caching
async function fetchAndStoreHolidays(country, year) {
    const countryCode = countryCodeMapping[country];
    if (!countryCode) {
        console.error(`No country code found for ${country}`);
        return;
    }

    // Return cached data if available
    if (holidaysCache.has(country)) {
        return holidaysCache.get(country);
    }

    try {
        let data = await fetchFromDateNagerAPI(countryCode, year);
        if (!Array.isArray(data) || data.length === 0) {
            console.warn(`No holiday data from Date Nager API for ${country}, trying local API...`);
            data = await fetchFromHolidaysAPI(countryCode, year);
        }
        holidaysCache.set(country, data);
    } catch (error) {
        console.error(`Error fetching and storing holidays for ${country}:`, error);
    }
}

// Check if a given date is a holiday in a specified country
export function isHoliday(date, country) {
    const countryHolidays = holidaysCache.get(country);
    if (!countryHolidays) return false;
    return countryHolidays.some(holiday => new Date(holiday.date).toDateString() === date.toDateString());
}

// Control concurrency for fetching holidays
const MAX_CONCURRENT_REQUESTS = 5;

async function fetchHolidaysWithConcurrencyControl(countries, year) {
    let index = 0;
    const processBatch = async () => {
        const batch = countries.slice(index, index + MAX_CONCURRENT_REQUESTS);
        index += MAX_CONCURRENT_REQUESTS;
        await Promise.all(batch.map(country => fetchAndStoreHolidays(country, year)));
        if (index < countries.length) {
            await processBatch();
        }
    };
    await processBatch();
}

// Filter countries that do not have holidays
export async function filterCountriesWithoutHolidays(year) {
    const countries = Object.keys(countryCodeMapping);
    await fetchHolidaysWithConcurrencyControl(countries, year);
    return countries.filter(country => !holidaysCache.get(country) || holidaysCache.get(country).length === 0);
}

// Example usage of the functions
(async () => {
    const year = 2024;
    const result = await filterCountriesWithoutHolidays(year);
    console.log('Countries without holidays:', result);
})();
