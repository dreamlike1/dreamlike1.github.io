import { countryCodeMapping } from './countryData.js';
import { fetchHolidaysFromLocalAPI } from './holidaysAPI.js'; 

const holidaysCache = new Map();

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

async function fetchFromDateNagerAPI(countryCode, year) {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
    return fetchData(url);
}

async function fetchFromHolidaysAPI(countryCode, year) {
    try {
        return await fetchHolidaysFromLocalAPI(countryCode, year);
    } catch (error) {
        console.error(`Error fetching holidays from local API for ${countryCode}:`, error);
        return [];
    }
}

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

export function isHoliday(date, country) {
    const countryHolidays = holidaysCache.get(country);
    if (!countryHolidays) return false;
    return countryHolidays.some(holiday => new Date(holiday.date).toDateString() === date.toDateString());
}

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

export async function filterCountriesWithoutHolidays(year) {
    const countries = Object.keys(countryCodeMapping);
    await fetchHolidaysWithConcurrencyControl(countries, year);
    return countries.filter(country => !holidaysCache.get(country) || holidaysCache.get(country).length === 0);
}

(async () => {
    const year = 2024;
    const result = await filterCountriesWithoutHolidays(year);
    console.log('Countries without holidays:', result);
})();
