// Import country code mapping from an external file
import { countryCodeMapping } from './countryData.js';

// Cache for storing fetched holidays with a composite key of country code and year
const holidayCache = new Map();
// List of countries with no holidays found from Nager.Date API
const noHolidayCountriesFromNager = [];

// Fetch API key from environment variables (client-side)
const CALENDERIFIC_API_KEY = 'c7oz2Y1sepuJbV8tyB1gik7SFumpoeUt';

if (!CALENDERIFIC_API_KEY) {
  console.error('Calenderific API key is not defined in environment variables.');
}

// Function to fetch holidays from Nager.Date API
async function fetchHolidaysFromNager(countryCode, year) {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`);
    if (!response.ok) throw new Error(`Nager API request failed: ${response.statusText}`);
    
    // Check if response body is empty
    if (response.headers.get('Content-Length') === '0') {
      console.warn(`Empty response body for ${countryCode} from Nager.Date API`);
      return [];
    }

    return await response.json();

  } catch (error) {
    console.error(`Error fetching holidays from Nager for ${countryCode}:`, error);
    return [];
  }
}

// Function to fetch holidays from Calenderific API as a fallback
async function fetchHolidaysFromCalenderific(countryCode, year) {
  try {
    if (!CALENDERIFIC_API_KEY) {
      throw new Error('Calenderific API key is not defined.');
    }

    const response = await fetch(`https://calendarific.com/api/v2/holidays?&api_key=${CALENDERIFIC_API_KEY}&country=${countryCode}&year=${year}`);
    if (!response.ok) {
      console.error(`Calenderific API request failed: ${response.statusText} (Status: ${response.status})`);
      return null;
    }
    const data = await response.json();
    return data.response.holidays.map(holiday => ({
      date: holiday.date.iso,
      localName: holiday.name,
      countryCode: countryCode
    }));
  } catch (error) {
    console.error(`Error fetching holidays from Calenderific for ${countryCode}:`, error);
    return null;
  }
}

// Function to get holidays for a country and year, using caching and fallback API
async function getHolidays(countryCode, year) {
  const cacheKey = `${countryCode}-${year}`;
  
  // Check if holidays are already cached
  if (holidayCache.has(cacheKey)) {
    return holidayCache.get(cacheKey);
  }

  let holidays = await fetchHolidaysFromNager(countryCode, year);
  
  if (holidays && holidays.length > 0) {
    holidayCache.set(cacheKey, holidays);
    return holidays;
  } 

  // If no holidays found from Nager.Date, add to the specific list
  noHolidayCountriesFromNager.push(countryCode);

  // Fetch from Calenderific
  holidays = await fetchHolidaysFromCalenderific(countryCode, year);
  if (holidays && holidays.length > 0) {
    holidayCache.set(cacheKey, holidays);
  }
  return holidays;
}

// Function to fetch holidays from APIs and handle caching
export async function fetchHolidays(country, year) {
  const countryCode = countryCodeMapping[country];
  if (!countryCode) {
    console.error(`No country code found for ${country}`);
    return null;
  }

  // Return cached data if available
  const holidays = await getHolidays(countryCode, year);
  
  if (holidays) {
    return holidays;
  } else {
    console.warn(`No holiday data available for ${country} for year ${year}`);
    return null;
  }
}

// Function to check if a given date is a holiday for a specific country
export async function isHoliday(date, country) {
  try {
    const countryCode = countryCodeMapping[country];
    if (!countryCode) {
      console.error(`Invalid country name: ${country}`);
      return false;
    }

    const year = new Date(date).getFullYear();
    const holidays = await getHolidays(countryCode, year);
    if (!holidays) return false;

    return holidays.some(holiday => holiday.date === date);
  } catch (error) {
    console.error(`Error in isHoliday function for ${country}:`, error);
    return false;
  }
}

// Log countries with no holidays found from Nager.Date API
console.log('Countries with no holidays found from Nager.Date API:', noHolidayCountriesFromNager);
