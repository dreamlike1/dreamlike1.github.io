import { countryCodeMapping } from './countryData.js';
import { fetchHolidaysFromLocalAPI } from './holidaysAPI.js'; 

// Cache to store holiday data for quick access
const holidaysCache = new Map();

/**
 * Fetches data from a given URL and returns it as JSON.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<object|null>} - The JSON data or null if an error occurs.
 */
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

/**
 * Fetches holiday data from the Date Nager API.
 * @param {string} countryCode - The country code.
 * @param {number} year - The year to fetch holidays for.
 * @returns {Promise<object[]>} - The holiday data or an empty array if an error occurs.
 */
async function fetchFromDateNagerAPI(countryCode, year) {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
    return fetchData(url);
}

/**
 * Fetches holiday data from a local API.
 * @param {string} countryCode - The country code.
 * @param {number} year - The year to fetch holidays for.
 * @returns {Promise<object[]>} - The holiday data or an empty array if an error occurs.
 */
async function fetchFromHolidaysAPI(countryCode, year) {
    try {
        return await fetchHolidaysFromLocalAPI(countryCode, year);
    } catch (error) {
        console.error(`Error fetching holidays from local API for ${countryCode}:`, error);
        return [];
    }
}

/**
 * Fetches and stores holiday data for a specific country.
 * @param {string} country - The country name.
 * @param {number} year - The year to fetch holidays for.
 */
async function fetchAndStoreHolidays(country, year) {
    const countryCode = countryCodeMapping[country];
    if (!countryCode) {
        console.error(`No country code found for ${country}`);
        return;
    }

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

/**
 * Checks if a specific date is a holiday in a given country.
 * @param {Date} date - The date to check.
 * @param {string} country - The country name.
 * @returns {boolean} - True if the date is a holiday, false otherwise.
 */
export function isHoliday(date, country) {
    const countryHolidays = holidaysCache.get(country);
    if (!countryHolidays) return false;
    return countryHolidays.some(holiday => new Date(holiday.date).toDateString() === date.toDateString());
}

/**
 * Fetches holiday data for all countries in batches to manage concurrency.
 * @param {string[]} countries - List of country names.
 * @param {number} year - The year to fetch holidays for.
 */
async function fetchHolidaysWithConcurrencyControl(countries, year) {
    const MAX_CONCURRENT_REQUESTS = 5;
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

/**
 * Finds countries without holidays for a given year.
 * @param {number} year - The year to check for holidays.
 * @returns {Promise<string[]>} - List of countries without holidays.
 */
export async function filterCountriesWithoutHolidays(year) {
    const countries = Object.keys(countryCodeMapping);
    await fetchHolidaysWithConcurrencyControl(countries, year);
    return countries.filter(country => !holidaysCache.get(country) || holidaysCache.get(country).length === 0);
}

// Example usage: logs countries without holidays for the year 2024
(async () => {
    const year = 2024;
    const result = await filterCountriesWithoutHolidays(year);
    console.log('Countries without holidays:', result);
})();
