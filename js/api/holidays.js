import { countryCodeMapping } from './countryData.js';
import { fetchHolidaysFromLocalAPI } from './holidaysAPI.js'; // Ensure this function is correctly imported

// Store holidays data with a cache
const holidaysCache = new Map();

// Function to fetch holidays from Date Nager API
async function fetchFromDateNagerAPI(countryCode, year) {
    try {
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch holidays from Date Nager API: ${response.statusText}`);
        }
        
        const responseText = await response.text();
        
        if (!responseText) {
            console.warn('Received empty response from Date Nager API');
            return []; // Return an empty array if the response is empty
        }
        
        return JSON.parse(responseText);
    } catch (error) {
        console.error(`Error fetching holidays from Date Nager API:`, error);
        return []; // Return an empty array on error
    }
}

// Function to fetch holidays from the local API
async function fetchFromHolidaysAPI(countryCode, year) {
    try {
        return await fetchHolidaysFromLocalAPI(countryCode, year); // Use the local function here
    } catch (error) {
        console.error(`Error fetching holidays from local Holidays API for ${countryCode}:`, error);
        return []; // Return an empty array if there's an error
    }
}

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
        let data = await fetchFromDateNagerAPI(countryCode, year);

        if (!Array.isArray(data) || data.length === 0) {
            console.warn(`No holiday data available from Date Nager API for ${country}, trying local Holidays API...`);
            data = await fetchFromHolidaysAPI(countryCode, year);
        }

        // Store the result in cache
        holidaysCache.set(country, data);
        return data; // Return the fetched data for immediate use
    } catch (error) {
        console.error(`Error fetching holidays for ${country}:`, error);
        return []; // Return an empty array on error
    }
}

// Function to check if a given date is a holiday in a specified country
export function isHoliday(date, country) {
    const countryHolidays = holidaysCache.get(country);
    if (!countryHolidays) return false;

    return countryHolidays.some(holiday => 
        new Date(holiday.date).toDateString() === date.toDateString()
    );
}

// Function to compute the business date considering holidays
export function getBusinessDate(date, country) {
    const countryHolidays = holidaysCache.get(country);
    if (!countryHolidays) return date;

    let businessDate = new Date(date);

    while (isHoliday(businessDate, country)) {
        businessDate.setDate(businessDate.getDate() + 1);
    }

    return businessDate;
}

// Function to filter countries without holidays and save results in an array
export async function filterCountriesWithoutHolidays(year) {
    const countriesWithoutHolidays = [];
    const countriesWithNoHolidays = new Set();

    // Fetch holidays for all countries in parallel
    const countries = Object.keys(countryCodeMapping);
    const fetchPromises = countries.map(country => fetchHolidays(country, year));

    // Wait for all fetch promises to complete
    await Promise.all(fetchPromises);

    // Filter countries that have no holidays from Date Nager API
    countries.forEach(country => {
        const holidays = holidaysCache.get(country);
        if (!holidays || holidays.length === 0) {
            countriesWithNoHolidays.add(country);
        }
    });

    // Convert Set to Array for consistency
    return Array.from(countriesWithNoHolidays);
}

// Example usage of the functions
(async () => {
    const year = 2024;
    const date = new Date(); // Replace with the specific date you want to check
    const country = 'US'; // Replace with the specific country you want to check

    // Get business date for a specific date and country
    const businessDate = getBusinessDate(date, country);
    console.log(`The business date for ${date.toDateString()} in ${country} is ${businessDate.toDateString()}`);

    // Find countries without holidays from Date Nager API
    const countriesWithoutHolidays = await filterCountriesWithoutHolidays(year);
    if (countriesWithoutHolidays.length > 0) {
        console.log('Countries without holidays from Date Nager API:', countriesWithoutHolidays);
    } else {
        console.log('All countries have holidays from Date Nager API.');
    }
})();
