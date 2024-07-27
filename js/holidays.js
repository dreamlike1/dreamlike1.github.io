// js/holidays.js
import { countryCodeMapping } from './countryData.js';

export let holidays = {};

export async function fetchHolidays(country, year) {
    const countryCode = countryCodeMapping[country];
    if (!countryCode) {
        console.error(`No country code found for ${country}`);
        return;
    }

    try {
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        if (!response.ok) {
            console.error(`Failed to fetch holidays for ${country}: ${response.status} ${response.statusText}`);
            return;
        }

        const data = await response.json();
        if (Array.isArray(data)) {
            holidays[country] = data;
        } else {
            console.warn(`No holiday data available for ${country}`);
        }
    } catch (error) {
        console.error(`Error fetching holidays for ${country}:`, error);
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
