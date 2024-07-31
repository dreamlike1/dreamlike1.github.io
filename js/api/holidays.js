// Import country code mapping from an external file
import { countryCodeMapping } from './countryData.js';

// Cache for storing fetched holidays
const holidayCache = new Map();
// List of countries with no holidays found from both APIs
const noHolidayCountries = [];

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
    const response = await fetch(`https://api.calenderific.com/v2/holidays?&api_key=YOUR_API_KEY&country=${countryCode}&year=2024`);
    if (!response.ok) throw new Error(`Calenderific API request failed: ${response.statusText}`);
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
    // If no holidays found, fetch from Calenderific
    holidays = await fetchHolidaysFromCalenderific(countryCode);
    if (holidays && holidays.length > 0) {
      holidayCache.set(countryCode, holidays);
    } else {
      // If still no holidays found, add to noHolidayCountries list
      noHolidayCountries.push(countryCode);
    }
  }
  return holidays;
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

// Log countries with no holidays found from both APIs
console.log('Countries with no holidays found:', noHolidayCountries);
