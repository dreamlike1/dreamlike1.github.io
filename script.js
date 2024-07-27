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

const countryCodeMapping = {
    "Australia": "AU", "Austria": "AT", "Belgium": "BE", "Bolivia": "BO",
    "Brazil": "BR", "Bulgaria": "BG", "Canada": "CA", "Croatia": "HR",
    "Cyprus": "CY", "Czech Republic": "CZ", "Denmark": "DK", "Estonia": "EE",
    "Finland": "FI", "France": "FR", "Germany": "DE", "Greece": "GR",
    "Hungary": "HU", "Ireland": "IE", "Italy": "IT", "Japan": "JP",
    "Latvia": "LV", "Lithuania": "LT", "Luxembourg": "LU", "Malta": "MT",
    "Mexico": "MX", "Netherlands": "NL", "New Zealand": "NZ", "Norway": "NO",
    "Poland": "PL", "Portugal": "PT", "Romania": "RO", "Slovakia": "SK",
    "Slovenia": "SI", "Spain": "ES", "Sweden": "SE", "United Kingdom": "GB",
    "United States": "US", "Vietnam": "VN", "South Korea": "KR", "Anguilla": "AI",
    "Antigua and Barbuda": "AG", "Aruba": "AW", "Bahamas": "BS", "Belize": "BZ",
    "Bosnia and Herzegovina": "BA", "Brunei": "BN", "Chile": "CL", "Colombia": "CO",
    "Costa Rica": "CR", "Curaçao": "CW", "Dominica": "DM", "Dominican Republic": "DO",
    "French Guiana": "GF", "Grenada": "GD", "Guadeloupe": "GP", "Haiti": "HT",
    "Honduras": "HN", "Hong Kong": "HK", "Jamaica": "JM", "Malaysia": "MY",
    "Montserrat": "MS", "Nicaragua": "NI", "Panama": "PA", "Paraguay": "PY",
    "Peru": "PE", "Philippines": "PH", "Puerto Rico": "PR", "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC", "Saint Vincent and the Grenadines": "VC", "Singapore": "SG",
    "Switzerland": "CH", "Trinidad and Tobago": "TT", "Turks and Caicos Islands": "TC",
    "U.S. Virgin Islands": "VI", "Venezuela": "VE",
};

let holidays = {};

async function fetchHolidays(country, year) {
    const countryCode = countryCodeMapping[country];
    if (!countryCode) return console.error(`No country code found for ${country}`);

    try {
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        if (!response.ok) throw new Error(`Failed to fetch holidays: ${response.statusText}`);

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

function isHoliday(date, country) {
    return holidays[country]?.some(holiday => new Date(holiday.date).toDateString() === date.toDateString()) || false;
}

function formatDate(date) {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function calculateBusinessDays(startDate, numDays, country) {
    let count = 0;
    let currentDate = new Date(startDate);

    while (count < numDays || isHoliday(currentDate, country)) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6 && !isHoliday(currentDate, country)) {
            count++;
        }
    }
    return currentDate;
}

async function populateCountries() {
    const countrySelect = document.getElementById('countrySelect');
    const selectedService = document.getElementById('serviceType').value;
    const countries = countryOptions[selectedService] || [];

    countrySelect.innerHTML = '<option value="">Select a country</option>';
    await Promise.all(countries.map(country => fetchHolidays(country, new Date().getFullYear())));
    
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

document.getElementById('serviceType').addEventListener('change', populateCountries);

async function calculateBusinessDate() {
    const dateRangeInput = document.getElementById('businessDays').value;
    const selectedCountry = document.getElementById('countrySelect').value;

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

    document.getElementById('result').value = `Between ${formatDate(endDateStart)} and ${formatDate(endDateEnd)}`;
}

document.getElementById('calculateButton').addEventListener('click', calculateBusinessDate);

document.getElementById('result').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('result').value).then(() => {
        const copyMessage = document.getElementById('copyMessage');
        copyMessage.style.display = 'block';
        setTimeout(() => copyMessage.style.display = 'none', 2000);
    });
});

document.addEventListener('DOMContentLoaded', populateCountries);
