import { populateCountries } from '../ui/countryUtils.js'; // Adjusted path
import { getBusinessDays } from '../ui/businessDaysUtils.js'; // Adjusted path
import { formatDate } from '../dateUtils/dateUtils.js'; // Correct path to dateUtils.js
import { calculateBusinessDate } from '../ui/dateCalculation.js';
import { populateBusinessDays } from '../ui/ui.js';
import { fetchHolidays } from '../api/holidays.js';

export function setupEventListeners() {
    const serviceTypeElement = document.getElementById('serviceType');
    const countrySelectElement = document.getElementById('countrySelect');
    const calculateButtonElement = document.getElementById('calculateButton');
    const resultFieldElement = document.getElementById('result');
    const copyMessageCalculatorElement = document.getElementById('copyMessageCalculator');
    const warningMessageElement = document.getElementById('warningMessage'); // Add reference to warning message element

    // Event listener for serviceType change
    serviceTypeElement.addEventListener('change', async () => {
        const serviceType = serviceTypeElement.value;
        await populateCountries(serviceType); // Fetch and cache holidays based on selected serviceType
        populateBusinessDays(); // Update business days after fetching holidays
    });

    // Event listener for countrySelect change
    countrySelectElement.addEventListener('change', async (event) => {
        const selectedCountry = event.target.value;
        if (selectedCountry) {
            const countryName = event.target.options[event.target.selectedIndex].text;
            const year = new Date().getFullYear(); // Use current year or a specific one

            // Fetch holidays to determine if the country has holidays
            const holidays = await fetchHolidays(countryName, year);

            // Show or hide warning message based on holidays availability
            if (!holidays || holidays.length === 0) {
                warningMessageElement.classList.remove('hidden');
            } else {
                warningMessageElement.classList.add('hidden');
            }
        }
        
        populateBusinessDays(); // Ensure business days are updated when country changes
    });

    // Event listener for calculateButton click
    calculateButtonElement.addEventListener('click', calculateBusinessDate);

    // Event listener for result field click
    resultFieldElement.addEventListener('click', () => {
        navigator.clipboard.writeText(resultFieldElement.value).then(() => {
            copyMessageCalculatorElement.style.display = 'block';
            setTimeout(() => {
                copyMessageCalculatorElement.style.display = 'none';
            }, 2000);
        });
    });
}
