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
        
        if (!responseText.trim()) {
            console.warn('Received empty response from Date Nager API');
            return [];
        }
        
        return JSON.parse(responseText);
    } catch (error) {
        console.error(`Error fetching holidays from Date Nager API:`, error);
        return [];
    }
}

// Function to fetch holidays from the local API
async function fetchFromLocalAPI(countryCode, year) {
    try {
        return await fetchHolidaysFromLocalAPI(countryCode, year);
    } catch (error) {
        console.error(`Error fetching holidays from local Holidays API for ${countryCode}:`, error);
        return [];
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

        // If no valid data from Date Nager API, try local API
        if (!Array.isArray(data) || data.length === 0) {
            console.warn(`No holiday data available from Date Nager API for ${country}, trying local Holidays API...`);
            data = await fetchFromLocalAPI(countryCode, year);
        }

        // Store the result in cache
        holidaysCache.set(country, data);
        return data;
    } catch (error) {
        console.error(`Error fetching holidays for ${country}:`, error);
        return [];
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
    const countriesWithoutHolidays = [];
    const countries = Object.keys(countryCodeMapping);
    
    // Fetch holidays for all countries in parallel
    const fetchPromises = countries.map(country => fetchHolidays(country, year));
    const allHolidays = await Promise.all(fetchPromises);

    // Check which countries have no holidays and need local API fetch
    for (const [index, country] of countries.entries()) {
        const holidays = allHolidays[index];

        if (!holidays.length) {
            console.log(`Country ${country} has no holidays from Date Nager API. Fetching from local API...`);
            const localHolidays = await fetchFromLocalAPI(countryCodeMapping[country], year);
            
            if (localHolidays.length) {
                holidaysCache.set(country, localHolidays);
            } else {
                countriesWithoutHolidays.push(country);
            }
        }
    }

    return countriesWithoutHolidays;
}

// Example usage of the functions
(async () => {
    const year = 2024;
    const result = await filterCountriesWithoutHolidays(year);
    console.log('Countries without holidays:', result);
})();
