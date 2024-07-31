// holidaysAPI.js

const axios = require('axios');

const calendarificAPIKey = process.env.CALENDARIFIC_API_KEY;
const cache = {};

// List of countries and years
const countries = [
    'BN', 'AI', 'AG', 'AW', 'CW', 'DM', 'GF', 'MY', 'GP', 'PH', 'KN', 'LC', 'VC', 'TT', 'TC', 'VI'
];
const years = ['2024', '2025', '2026'];

/**
 * Transform Calendarific API holiday data to match the Date Nager API format.
 * @param {Array} holidays - The array of holiday objects from Calendarific.
 * @param {string} countryCode - The country code.
 * @returns {Array} - Transformed holidays array.
 */
function transformToNagerDateFormat(holidays, countryCode) {
    return holidays.map(holiday => {
        const date = new Date(holiday.date);
        return {
            date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
            localName: holiday.name,
            name: holiday.name,
            countryCode: countryCode
        };
    });
}

/**
 * Fetch holidays from Calendarific API.
 * @param {string} countryCode - The country code for the holidays.
 * @param {number} year - The year for which to fetch holidays.
 * @returns {Promise<Array>} - A promise that resolves to an array of holidays.
 */
async function fetchHolidaysFromLocalAPI(countryCode, year) {
    const cacheKey = `${countryCode}-${year}`;
    
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    
    try {
        const response = await axios.get('https://calendarific.com/api/v2/holidays', {
            params: {
                api_key: calendarificAPIKey,
                country: countryCode,
                year: year
            }
        });
        
        const holidays = response.data.response.holidays;
        const transformedHolidays = transformToNagerDateFormat(holidays, countryCode);
        
        // Cache the result
        cache[cacheKey] = transformedHolidays;
        
        return transformedHolidays;
    } catch (error) {
        console.error(`Error fetching holidays for ${countryCode} in ${year}:`, error);
        throw error;
    }
}

/**
 * Fetch and return holidays for a specific year and country.
 * @param {string} countryCode - The country code for the holidays.
 * @param {number} year - The year for which to fetch holidays.
 * @returns {Promise<Array>} - A promise that resolves to an array of holidays.
 */
export async function getHolidays(countryCode, year) {
    if (!countries.includes(countryCode) || !years.includes(year.toString())) {
        throw new Error(`Unsupported country code: ${countryCode} or year: ${year}`);
    }
    
    return fetchHolidaysFromLocalAPI(countryCode, year);
}

// Export fetchHolidaysFromLocalAPI for external use
export { fetchHolidaysFromLocalAPI };
