// js/eventHandlers/eventHandlers.js
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

    serviceTypeElement.addEventListener('change', async () => {
        const serviceType = serviceTypeElement.value;
        await populateCountries(serviceType);
        populateBusinessDays();
    });

    countrySelectElement.addEventListener('change', async (event) => {
        const selectedCountry = event.target.value;
        if (selectedCountry) {
            const countryName = event.target.options[event.target.selectedIndex].text;
            const currentYear = new Date().getFullYear();
            const endYear = currentYear + 3;

            try {
                const holidays = await fetchHolidaysForYears(countryName, currentYear, endYear);
                
                if (!holidays || holidays.length === 0) {
                    warningMessageElement.classList.remove('hidden');
                } else {
                    warningMessageElement.classList.add('hidden');
                }

                initializeDateSelector(holidays);

            } catch (error) {
                console.error(`Error fetching holidays for ${countryName}:`, error);
            }

            populateBusinessDays();
        }
    });

    calculateButtonElement.addEventListener('click', calculateBusinessDate);

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
