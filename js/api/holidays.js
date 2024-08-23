// js/api/holidays.js
import { countryCodeMapping } from './countryData.js';

const holidayCache = new Map();
const noHolidayCountriesFromNager = [];

const CALENDARIFIC_API_KEY = 'BTt8heuTpeBgdcywGi3aogyX4C0fKfQ3'; // Ensure this is defined

if (!CALENDARIFIC_API_KEY) {
  console.error('Calendarific API key is not defined in environment variables.');
}

async function fetchHolidaysFromNager(countryCode, year) {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`);
    if (!response.ok) throw new Error(`Nager API request failed: ${response.statusText}`);
    
    const text = await response.text();
    if (!text) {
      console.warn(`Empty response body for ${countryCode} from Nager.Date API`);
      return [];
    }

    try {
      const holidays = JSON.parse(text);
      return holidays.filter(holiday => holiday.global);
    } catch (error) {
      console.error(`Error parsing JSON from Nager.Date API response for ${countryCode}:`, error);
      return [];
    }
    
  } catch (error) {
    console.error(`Error fetching holidays from Nager for ${countryCode}:`, error);
    return [];
  }
}

async function getHolidays(countryName, year) {
  const countryCode = countryCodeMapping[countryName];
  if (!countryCode) {
    console.error(`No country code found for ${countryName}`);
    return [];
  }

  const cacheKey = `${countryName}-${year}`;
  
  if (holidayCache.has(cacheKey)) {
    return holidayCache.get(cacheKey);
  }

  let holidays = await fetchHolidaysFromNager(countryCode, year);
  
  if (holidays && holidays.length > 0) {
    holidayCache.set(cacheKey, holidays);
    return holidays;
  } 

  noHolidayCountriesFromNager.push({ countryName, year });

  holidayCache.set(cacheKey, []);
  return [];
}

// Function to fetch holidays for multiple years
export async function fetchHolidaysForYears(countryName, startYear, endYear) {
  const holidays = [];
  for (let year = startYear; year <= endYear; year++) {
    const yearHolidays = await getHolidays(countryName, year);
    holidays.push(...yearHolidays);
  }
  return holidays;
}

export async function fetchHolidays(countryName, year) {
  console.log(`Fetching holidays for ${countryName} in ${year}`);
  const holidays = await getHolidays(countryName, year);
  
  if (holidays) {
    return holidays;
  } else {
    console.warn(`No holiday data available for ${countryName} for year ${year}`);
    return null;
  }
}

export async function isHoliday(date, countryName) {
  try {
    const year = new Date(date).getFullYear();
    const holidays = await getHolidays(countryName, year);
    if (!holidays) return false;

    return holidays.some(holiday => holiday.date === date);
  } catch (error) {
    console.error(`Error in isHoliday function for ${countryName}:`, error);
    return false;
  }
}

export function listNoHolidayCountries() {
  if (noHolidayCountriesFromNager.length > 0) {
    console.log(`Countries with no holidays found from Nager.Date API:`);
    noHolidayCountriesFromNager.forEach(({ countryName, year }) => {
      console.log(`- ${countryName} (Year: ${year})`);
    });
    console.log(`Total: ${noHolidayCountriesFromNager.length}`);
  }
}
