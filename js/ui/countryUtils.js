// js/ui/countryUtils.js
import { fetchHolidaysForYears } from '../api/holidays.js';
import { listNoHolidayCountries } from '../api/holidays.js';
import { countryOptions } from '../api/countryData.js';

let holidaysCache = {};  // Cache to store holidays data for all countries

export async function populateCountries(serviceType = 'expressPaid') {
    const countrySelectDropdown = $('#countrySelect');
    const countries = countryOptions[serviceType] || [];
    
    console.log('Service Type:', serviceType);
    console.log('Countries:', countries);
    
    const options = countries.map(country => ({
        text: country,
        value: country
    }));

    console.log('Dropdown Options:', options);

    await initializeDropdown(countrySelectDropdown, options);

    holidaysCache = {};

    await fetchAndCacheHolidays(countries);

    listNoHolidayCountries();
}

async function initializeDropdown(dropdown, options) {
    dropdown.empty();
    dropdown.append('<option value="" disabled selected>Select Country</option>');

    if (dropdown.hasClass('ui dropdown')) {
        dropdown.dropdown('destroy');
    }

    const optionElements = options.map(option => `<option value="${option.value}">${option.text}</option>`).join('');
    dropdown.append(optionElements);

    dropdown.dropdown({
        onChange: function(value) {
            console.log('Dropdown value changed to:', value);
            setTimeout(() => dropdown.dropdown('hide'), 100);
        },
        allowAdditions: false,
        fullTextSearch: true
    });

    if (options.length > 0) {
        dropdown.dropdown('set selected', options[0].value);
    }
}

async function fetchAndCacheHolidays(countries) {
    console.log('Fetching holidays for countries:', countries);
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 3;

    const fetchHolidaysPromises = countries.map(async country => {
        try {
            const holidays = await fetchHolidaysForYears(country, currentYear, endYear);
            holidaysCache[country] = holidays;
            console.log('Holidays fetched and cached for:', country, holidays);
        } catch (error) {
            console.error(`Error fetching holidays for ${country}:`, error);
        }
    });

    await Promise.all(fetchHolidaysPromises);
    console.log('All holidays data fetched and cached');
    console.log('Holidays Cache:', holidaysCache);
}

export function getHolidaysForCountry(country) {
    return holidaysCache[country] || [];
}
