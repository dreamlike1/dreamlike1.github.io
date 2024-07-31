// api/holidays.js (This file will be placed in the 'api' folder for Vercel functions)

const API_URL = 'https://calendarific.com/api/v2/holidays';

/**
 * Fetch holidays from Calendarific API.
 * @param {string} countryCode - The country code for which to fetch holidays.
 * @param {number} year - The year for which to fetch holidays.
 * @returns {Promise<Array>} - A promise that resolves to an array of holidays.
 */
async function fetchHolidaysFromAPI(countryCode, year) {
    const apiKey = process.env.CALENDARIFIC_API_KEY;

    try {
        const response = await fetch(`${API_URL}?api_key=${apiKey}&country=${countryCode}&year=${year}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.response.holidays;
    } catch (error) {
        console.error(`Error fetching holidays for ${countryCode} in ${year}:`, error);
        throw new Error(`Failed to fetch holidays for ${countryCode}`);
    }
}

/**
 * Transform holiday data to match the Date Nager API format.
 * @param {Array} holidays - The array of holiday objects from Calendarific.
 * @param {string} countryCode - The country code.
 * @returns {Array} - Transformed holidays array.
 */
function transformToDateNagerFormat(holidays, countryCode) {
    return holidays.map(holiday => {
        const { date, name } = holiday;
        return {
            date: date, // Calendarific provides the date in ISO format
            localName: name,
            name: name,
            countryCode: countryCode
        };
    });
}

/**
 * Fetch and transform holidays data for a specific country and year.
 * @param {string} countryCode - The country code.
 * @param {number} year - The year.
 * @returns {Promise<Array>} - A promise that resolves to an array of holidays.
 */
export async function fetchHolidaysFromLocalAPI(countryCode, year) {
    try {
        const holidays = await fetchHolidaysFromAPI(countryCode, year);
        const transformedHolidays = transformToDateNagerFormat(holidays, countryCode);
        return transformedHolidays;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Serverless function to handle API requests.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export default async function handler(req, res) {
    const { countryCode, year } = req.query;

    if (!countryCode || !year) {
        return res.status(400).json({ error: 'Country code and year are required' });
    }

    try {
        const holidays = await fetchHolidaysFromLocalAPI(countryCode, year);
        res.status(200).json(holidays);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch holidays: ${error.message}` });
    }
}
