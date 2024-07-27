import { countryCodeMapping } from './countryData.js';

// Store holidays data
export let holidays = {};

// Function to fetch holidays from the HolidayAPI proxy
async function fetchFromHolidayAPI(country, year) {
    try {
        const response = await fetch(`/api/holidays?country=${country}&year=${year}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch holidays from proxy: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching holidays from proxy:`, error);
        throw error;
    }
}

// Function to fetch holidays from the primary API or fallback to HolidayAPI
export async function fetchHolidays(country, year) {
    const countryCode = countryCodeMapping[country];
    if (!countryCode) {
        console.error(`No country code found for ${country}`);
        return;
    }

    try {
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        
        // Handle non-OK responses and empty responses
        if (!response.ok || response.status === 204) {
            console.warn(`Fetching holidays from primary API failed or returned no data for ${country}, falling back to HolidayAPI.`);
            const data = await fetchFromHolidayAPI(country, year);
            if (Array.isArray(data.holidays)) {
                holidays[country] = data.holidays;
            } else {
                console.warn(`No holiday data available for ${country}`);
            }
            return;
        }

        const text = await response.text();
        try {
            const data = JSON.parse(text);
            if (Array.isArray(data)) {
                holidays[country] = data;
            } else {
                console.warn(`No holiday data available for ${country}`);
            }
        } catch (e) {
            console.error(`Failed to parse JSON for ${country}:`, e);
            // Fallback in case of parsing error
            const data = await fetchFromHolidayAPI(country, year);
            if (Array.isArray(data.holidays)) {
                holidays[country] = data.holidays;
            } else {
                console.warn(`No holiday data available for ${country}`);
            }
        }
    } catch (error) {
        console.error(`Error fetching holidays for ${country}:`, error);
    }
}
