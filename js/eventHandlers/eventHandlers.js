import { fetchHolidaysForYears } from '../api/holidays.js';
import { initializeDateSelector } from '../calendar/calendar.js';
import { populateCountries } from '../ui/countryUtils.js';
import { populateBusinessDays } from '../ui/ui.js';
import { calculateBusinessDate } from '../ui/dateCalculation.js';

export function setupEventListeners() {
    const serviceTypeElement = document.getElementById('serviceType');
    const countrySelectElement = document.getElementById('countrySelect');
    const calculateButtonElement = document.getElementById('calculateButton');
    const resultFieldElement = document.getElementById('result');
    const standardResultFieldElement = document.getElementById('standardResult');
    const copyMessageCalculatorElement = document.getElementById('copyMessageCalculator');
    const copyMessageStandardResultElement = document.getElementById('copyMessageStandardResult');
    const warningMessageElement = document.getElementById('warningMessage');

    let previousCountry = ''; // Variable to store the previously selected country

    async function updateCountries() {
        console.log('Updating Countries');
        const serviceType = serviceTypeElement.value;
        await populateCountries(serviceType);
        populateBusinessDays();

        // Check if the previously selected country is available
        const newOptions = Array.from(countrySelectElement.options).map(option => option.value);
        if (newOptions.includes(previousCountry)) {
            countrySelectElement.value = previousCountry; // Reselect the previous country
        } else {
            const firstOption = countrySelectElement.options[0];
            if (firstOption) {
                countrySelectElement.value = firstOption.value; // Default to the first option
            } else {
                countrySelectElement.value = ''; // Clear the selection if no options are available
            }
        }
    }

    async function handleCountryChange() {
        console.log('Country Changed');
        const selectedCountry = countrySelectElement.value;
        if (selectedCountry) {
            const countryName = countrySelectElement.options[countrySelectElement.selectedIndex]?.text;
            const currentYear = new Date().getFullYear();
            const endYear = currentYear + 3;

            try {
                const holidays = await fetchHolidaysForYears(countryName, currentYear, endYear);
                console.log('Holidays:', holidays);

                if (!holidays || holidays.length === 0) {
                    warningMessageElement.classList.remove('hidden');
                } else {
                    warningMessageElement.classList.add('hidden');
                }

                initializeDateSelector(holidays);

            } catch (error) {
                console.error(`Error fetching holidays for ${countryName}:`, error);
            }
        }

        // Ensure result fields are visible
        resultFieldElement.style.display = 'block';
        standardResultFieldElement.style.display = 'block';
    }

    serviceTypeElement.addEventListener('change', async () => {
        await updateCountries();

        // Handle country validation after changing the service type
        await handleCountryChange();
        
        // Store the currently selected country for future reference
        previousCountry = countrySelectElement.value;
    });

    countrySelectElement.addEventListener('change', async () => {
        await handleCountryChange();
        populateBusinessDays();
    });

    calculateButtonElement.addEventListener('click', async () => {
        console.log('Calculate Button Clicked');
        const startDateInput = document.getElementById('startDate').value;
        const dateRangeInput = document.getElementById('businessDays').value;
        const selectedCountry = document.getElementById('countrySelect').value;

        // Validate start date
        const startDate = new Date(startDateInput);
        if (!startDateInput || isNaN(startDate.getTime())) {
            alert('Please enter a valid start date.');
            return;
        }

        // Validate country and range input
        if (!dateRangeInput || !selectedCountry) {
            alert('Please enter a valid range of business days and select a country.');
            return;
        }

        // Fetch holidays for the selected country
        let holidays = [];
        try {
            holidays = await fetchHolidaysForYears(selectedCountry, new Date().getFullYear(), new Date().getFullYear() + 3);
            console.log('Holidays:', holidays);
        } catch (error) {
            console.error('Error fetching holidays:', error);
        }

        // Check if holidays were successfully fetched
        if (!Array.isArray(holidays)) {
            console.error('No holidays data found or error fetching holidays.');
        }

        try {
            // Calculate the business dates
            await calculateBusinessDate();
            console.log('Business Date Calculation Done');
            
            // Ensure result fields are visible
            resultFieldElement.style.display = 'block';
            standardResultFieldElement.style.display = 'block';
        } catch (error) {
            console.error('Error calculating business dates:', error);
            alert('Error calculating business dates. Please check the input and try again.');
        }

        // If no holidays were found, open the external date calculator in a new tab
        if (!holidays || holidays.length === 0) {
            window.open('https://www.timeanddate.com/date/weekdayadd.html', '_blank');
        }
    });

    resultFieldElement.addEventListener('click', () => {
        navigator.clipboard.writeText(resultFieldElement.value).then(() => {
            copyMessageCalculatorElement.style.display = 'block';
            setTimeout(() => {
                copyMessageCalculatorElement.style.display = 'none';
            }, 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
    });

    standardResultFieldElement.addEventListener('click', () => {
        navigator.clipboard.writeText(standardResultFieldElement.value).then(() => {
            copyMessageStandardResultElement.style.display = 'block';
            setTimeout(() => {
                copyMessageStandardResultElement.style.display = 'none';
            }, 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
    });
}
