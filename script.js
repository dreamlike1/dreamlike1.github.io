const countryOptions = {
    expressPaid: [
        "Australia", "Austria", "Belgium", "Bolivia", "Brazil", "Bulgaria",
        "Canada", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia",
        "Finland", "France", "Germany", "Greece", "Hungary", "Ireland",
        "Italy", "Japan", "Latvia", "Lithuania", "Luxembourg", "Malta",
        "Mexico", "Netherlands", "New Zealand", "Norway", "Poland",
        "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
        "United Kingdom", "United States", "Vietnam"
    ],
    expressFree: ["Japan", "South Korea"],
    economy: ["United States"],
    standard: [
        "Anguilla", "Antigua and Barbuda", "Aruba", "Bahamas", "Belize",
        "Belgium", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Brunei",
        "Bulgaria", "Canada", "Chile", "Colombia", "Costa Rica", "Croatia",
        "Curaçao", "Denmark", "Dominica", "Dominican Republic", "Estonia",
        "Finland", "France", "French Guiana", "Germany", "Greece", "Grenada",
        "Guadeloupe", "Haiti", "Honduras", "Hong Kong", "Ireland", "Italy",
        "Jamaica", "Japan", "Malaysia", "Malta", "Mexico", "Montserrat",
        "Netherlands", "New Zealand", "Nicaragua", "Norway", "Panama",
        "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico",
        "Romania", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
        "Singapore", "Slovakia", "Slovenia", "South Korea", "Spain", "Sweden",
        "Switzerland", "Trinidad and Tobago", "Turks and Caicos Islands", 
        "United Kingdom", "United States", "U.S. Virgin Islands", "Venezuela", 
        "Vietnam"
    ],
    collection: ["Canada", "United States"],
};

// Country code mapping
const countryCodeMapping = {
    "Australia": "AU",
    "Austria": "AT",
    "Belgium": "BE",
    "Bolivia": "BO",
    "Brazil": "BR",
    "Bulgaria": "BG",
    "Canada": "CA",
    "Croatia": "HR",
    "Cyprus": "CY",
    "Czech Republic": "CZ",
    "Denmark": "DK",
    "Estonia": "EE",
    "Finland": "FI",
    "France": "FR",
    "Germany": "DE",
    "Greece": "GR",
    "Hungary": "HU",
    "Ireland": "IE",
    "Italy": "IT",
    "Japan": "JP",
    "Latvia": "LV",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "Malta": "MT",
    "Mexico": "MX",
    "Netherlands": "NL",
    "New Zealand": "NZ",
    "Norway": "NO",
    "Poland": "PL",
    "Portugal": "PT",
    "Romania": "RO",
    "Slovakia": "SK",
    "Slovenia": "SI",
    "Spain": "ES",
    "Sweden": "SE",
    "United Kingdom": "GB",
    "United States": "US",
    "Vietnam": "VN",
    "South Korea": "KR",
    "Anguilla": "AI",
    "Antigua and Barbuda": "AG",
    "Aruba": "AW",
    "Bahamas": "BS",
    "Belize": "BZ",
    "Bosnia and Herzegovina": "BA",
    "Brunei": "BN",
    "Chile": "CL",
    "Colombia": "CO",
    "Costa Rica": "CR",
    "Curaçao": "CW",
    "Dominica": "DM",
    "Dominican Republic": "DO",
    "French Guiana": "GF",
    "Grenada": "GD",
    "Guadeloupe": "GP",
    "Haiti": "HT",
    "Honduras": "HN",
    "Hong Kong": "HK",
    "Jamaica": "JM",
    "Malaysia": "MY",
    "Montserrat": "MS",
    "Nicaragua": "NI",
    "Panama": "PA",
    "Paraguay": "PY",
    "Peru": "PE",
    "Philippines": "PH",
    "Puerto Rico": "PR",
    "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC",
    "Saint Vincent and the Grenadines": "VC",
    "Singapore": "SG",
    "Switzerland": "CH",
    "Trinidad and Tobago": "TT",
    "Turks and Caicos Islands": "TC",
    "U.S. Virgin Islands": "VI",
    "Venezuela": "VE",
};

// Store holidays
let holidays = {};

// Fetch holidays for a specific country and year
async function fetchHolidays(country, year) {
    const countryCode = countryCodeMapping[country];
    if (!countryCode) {
        console.error(`No country code found for ${country}`);
        return;
    }
    
    console.log(`Fetching holidays for ${country} (${countryCode}) in ${year}`);
    
    try {
        const response = await fetch(`https://api.openholidays.com/v1/holidays/${year}/${countryCode}`);
        console.log(response); // Log the response object
        
        if (!response.ok) {
            console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
            return;
        }

        const data = await response.json();
        console.log(data); // Log the parsed data
        
        if (data && Array.isArray(data)) {
            holidays[country] = data;
            console.log(`Holidays for ${country}:`, holidays[country]);
        } else {
            console.warn(`No holiday data available for ${country}`);
        }
    } catch (error) {
        console.error(`Error fetching holidays for ${country}:`, error);
    }
}

// Check if a date is a holiday
function isHoliday(date, country) {
    if (!holidays[country]) {
        console.log(`No holidays found for ${country}`);
        return false;
    }
    return holidays[country].some(holiday => 
        new Date(holiday.date).toDateString() === date.toDateString()
    );
}

// Format date to a string with month names
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Calculate business days, excluding weekends and holidays
function calculateBusinessDays(startDate, numDays, country) {
    let currentDate = new Date(startDate);
    let count = 0;

    while (count < numDays) {
        currentDate.setDate(currentDate.getDate() + 1);
        console.log(`Checking date: ${currentDate.toDateString()}`);
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6 && !isHoliday(currentDate, country)) {
            count++;
        }
    }

    while (isHoliday(currentDate, country)) {
        console.log(`Date ${currentDate.toDateString()} is a holiday, moving to next day`);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(`Calculated end date: ${currentDate.toDateString()}`);
    return currentDate;
}

// Populate country options and fetch holidays
async function populateCountries() {
    const countrySelect = document.getElementById('countrySelect');
    const selectedService = document.getElementById('serviceType').value;
    const countries = countryOptions[selectedService] || [];

    console.log(`Selected service: ${selectedService}, Countries: ${countries}`);
    countrySelect.innerHTML = '<option value="">Select a country</option>'; // Add default option
    
    for (const country of countries) {
        await fetchHolidays(country, new Date().getFullYear()); // Fetch holidays for each country
    }

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

// Event listeners
document.getElementById('serviceType').addEventListener('change', populateCountries);

async function calculateBusinessDate() {
    const dateRangeInput = document.getElementById('businessDays').value;
    const selectedCountry = document.getElementById('countrySelect').value;

    console.log(`Input: ${dateRangeInput}, Country: ${selectedCountry}`);

    if (!dateRangeInput || !selectedCountry) {
        alert('Please enter a valid range of business days and select a country.');
        return;
    }

    const startDate = new Date(document.getElementById('startDate').value);
    const ranges = dateRangeInput.split('-').map(Number);
    const numDaysStart = ranges[0];
    const numDaysEnd = ranges[1] || ranges[0];

    await fetchHolidays(selectedCountry, startDate.getFullYear());

    const endDateStart = calculateBusinessDays(startDate, numDaysStart, selectedCountry);
    const endDateEnd = calculateBusinessDays(startDate, numDaysEnd, selectedCountry);

    const formattedStart = formatDate(endDateStart);
    const formattedEnd = formatDate(endDateEnd);

    document.getElementById('result').value = `Between ${formattedStart} and ${formattedEnd}`;
    console.log(`Result: Between ${formattedStart} and ${formattedEnd}`);
}

document.getElementById('calculateButton').addEventListener('click', calculateBusinessDate);

// Copy result to clipboard
document.getElementById('result').addEventListener('click', () => {
    const resultField = document.getElementById('result');
    navigator.clipboard.writeText(resultField.value).then(() => {
        const copyMessage = document.getElementById('copyMessage');
        copyMessage.style.display = 'block';
        setTimeout(() => {
            copyMessage.style.display = 'none';
        }, 2000);
    });
});

// Initial population of countries
document.addEventListener('DOMContentLoaded', () => {
    populateCountries();
});
