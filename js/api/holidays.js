// js/holidays.js
import { countryCodeMapping } from './countryData.js';

const NAGER_API_URL = 'https://date.nager.at/api/v3/PublicHolidays';
const HOLIDAY_API_URL = 'https://holidayapi.com/v1/holidays';
const HOLIDAY_API_KEY = '83f19228-84e2-4cf5-8c3e-25e84795705f'; // Replace with your actual API key

export let holidays = {};

async function fetchFromHolidayAPI(countryCode, year) {
    try {
        const response = await fetch(`${HOLIDAY_API_URL}?country=${countryCode}&year=${year}&key=${HOLIDAY_API_KEY}`);
        if (!response.ok) {
            console.error(`Failed to fetch holidays from HolidayAPI for ${countryCode}: ${response.status} ${response.statusText}`);
            return [];
        }
        const data = await response.json();
        return data.holidays || [];
    } catch (error) {
        console.error(`Error fetching holidays from HolidayAPI for ${countryCode}:`, error);
        return [];
    }
}

export async function fetchHolidays(country, year) {
    const countryCode = countryCodeMapping[country];
    if (!countryCode) {
        console.error(`No country code found for ${country}`);
        return;
    }

    try {
        const response = await fetch(`${NAGER_API_URL}/${year}/${countryCode}`);
        if (!response.ok) {
            console.error(`Failed to fetch holidays for ${country} from Nager API: ${response.status} ${response.statusText}`);
            const holidaysFromFallbackAPI = await fetchFromHolidayAPI(countryCode, year);
            if (holidaysFromFallbackAPI.length > 0) {
                holidays[country] = holidaysFromFallbackAPI;
            }
            return;
        }

        const data = await response.json();
        if (Array.isArray(data)) {
            holidays[country] = data;
        } else {
            console.warn(`No holiday data available for ${country} from Nager API`);
            const holidaysFromFallbackAPI = await fetchFromHolidayAPI(countryCode, year);
            if (holidaysFromFallbackAPI.length > 0) {
                holidays[country] = holidaysFromFallbackAPI;
            }
        }
    } catch (error) {
        console.error(`Error fetching holidays for ${country} from Nager API:`, error);
        const holidaysFromFallbackAPI = await fetchFromHolidayAPI(countryCode, year);
        if (holidaysFromFallbackAPI.length > 0) {
            holidays[country] = holidaysFromFallbackAPI;
        }
    }
}

export function isHoliday(date, country) {
    if (!holidays[country]) {
        return false;
    }
    return holidays[country].some(holiday => 
        new Date(holiday.date).toDateString() === date.toDateString()
    );
}
