// Import country code mapping from an external file
import { countryCodeMapping } from './countryData.js';

// Cache for storing fetched holidays
const holidayCache = new Map();
// List of countries with no holidays found from Nager.Date API
const noHolidayCountriesFromNager = [];

// Function to fetch holidays from Nager.Date API
async function fetchHolidaysFromNager(countryCode) {
  try {
    const response = await fetch(`https://date.nager.at/Api/v2/PublicHoliday/2024/${countryCode}`);
    if (!response.ok) throw new Error(`Nager API request failed: ${response.statusText}`);
    const holidays = await response.json();
    return holidays;
  } catch (error) {
    console.error(`Error fetching holidays from Nager for ${countryCode}:`, error);
    return null;
  }
}

// Function to fetch holidays from Calenderific API as a fallback
async function fetchHolidaysFromCalenderific(countryCode) {
  try {
    const response = await fetch(`https://api.calenderific.com/v2/holidays?&api_key=c7oz2Y1sepuJbV8tyB1gik7SFumpoeUt&country=${countryCode}&year=2024`);
    if (!response.ok) {
      console.error(`Calenderific API request failed: ${response.statusText} (Status: ${response.status})`);
      return null;
    }
    const data = await response.json();
    const holidays = data.response.holidays.map(holiday => ({
      date: holiday.date.iso,
      localName: holiday.name,
      countryCode: countryCode
    }));
    return holidays;
  } catch (error) {
    console.error(`Error fetching holidays from Calenderific for ${countryCode}:`, error);
    return null;
  }
}

// Function to get holidays for a country, using caching and fallback API
async function getHolidays(countryCode) {
  // Check if holidays are already cached
  if (holidayCache.has(countryCode)) {
    return holidayCache.get(countryCode);
  }

  // Fetch holidays from Nager.Date
  let holidays = await fetchHolidaysFromNager(countryCode);
  if (holidays && holidays.length > 0) {
    holidayCache.set(countryCode, holidays);
  } else {
    // If no holidays found from Nager.Date, add to the specific list
    noHolidayCountriesFromNager.push(countryCode);

    // Fetch from Calenderific
    holidays = await fetchHolidaysFromCalenderific(countryCode);
    if (holidays && holidays.length > 0) {
      holidayCache.set(countryCode, holidays);
    }
  }
  return holidays;
}

// Function to fetch holidays from APIs and handle caching
export async function fetchHolidays(country, year) {
  const countryCode = countryCodeMapping[country];
  if (!countryCode) {
    console.error(`No country code found for ${country}`);
    return;
  }

  // Return cached data if available
  if (holidayCache.has(countryCode)) {
    return holidayCache.get(countryCode);
  }

  try {
    let data = await fetchHolidaysFromNager(countryCode, year);

    // If Nager.Date API returns empty or fails, fetch from Calenderific API
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No holiday data available from Nager.Date API for ${country}, trying Calenderific API...`);
      data = await fetchHolidaysFromCalenderific(countryCode, year);

      // Log if the fallback was successful
      if (data && data.length > 0) {
        console.info(`Successfully fetched holiday data from Calenderific API for ${country}`);
      } else {
        console.warn(`No holiday data available from Calenderific API for ${country} either`);
      }
    } else {
      console.info(`Successfully fetched holiday data from Nager.Date API for ${country}`);
    }

    // Store the result in cache
    holidayCache.set(countryCode, data);
    return data;
  } catch (error) {
    console.error(`Error fetching holidays for ${country}:`, error);
    return null;
  }
}

// Function to check if a given date is a holiday for a specific country
export async function isHoliday(date, country) {
  try {
    // Convert country name to country code using the mapping
    const countryCode = countryCodeMapping[country];
    if (!countryCode) {
      console.error(`Invalid country name: ${country}`);
      return false;
    }

    // Get holidays for the country
    const holidays = await getHolidays(countryCode);
    if (!holidays) return false;

    // Check if the date matches any holiday date
    return holidays.some(holiday => holiday.date === date);
  } catch (error) {
    console.error(`Error in isHoliday function for ${country}:`, error);
    return false;
  }
}

// Log countries with no holidays found from Nager.Date API
console.log('Countries with no holidays found from Nager.Date API:', noHolidayCountriesFromNager);
