// js/eventhandlers.js

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
        
        // Delay fetching selected country value to ensure dropdown is updated
        setTimeout(() => {
            const selectedCountry = countrySelectElement.value;
            console.log('Selected Country after service type change:', selectedCountry);
            
            if (selectedCountry) {
                const countryName = countrySelectElement.options[countrySelectElement.selectedIndex]?.text;
                console.log('Country Name after service type change:', countryName);
                const currentYear = new Date().getFullYear();
                const endYear = currentYear + 3;

                fetchHolidaysForYears(countryName, currentYear, endYear)
                    .then(holidays => {
                        if (!holidays || holidays.length === 0) {
                            warningMessageElement.classList.remove('hidden');
                        } else {
                            warningMessageElement.classList.add('hidden');
                        }

                        initializeDateSelector(holidays);
                    })
                    .catch(error => console.error(`Error fetching holidays for ${countryName}:`, error));
            }
        }, 100); // Adjust timing as needed
    });

    countrySelectElement.addEventListener('change', async (event) => {
        const selectedCountry = event.target.value;
        console.log('Selected Country on change event:', selectedCountry);

        if (selectedCountry) {
            const countryName = event.target.options[event.target.selectedIndex]?.text;
            console.log('Country Name from options:', countryName);
            const currentYear = new Date().getFullYear();
            const endYear = currentYear + 3;

            fetchHolidaysForYears(countryName, currentYear, endYear)
                .then(holidays => {
                    if (!holidays || holidays.length === 0) {
                        warningMessageElement.classList.remove('hidden');
                    } else {
                        warningMessageElement.classList.add('hidden');
                    }

                    initializeDateSelector(holidays);
                })
                .catch(error => console.error(`Error fetching holidays for ${countryName}:`, error));

            populateBusinessDays();
        }
    });

    calculateButtonElement.addEventListener('click', async () => {
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
        const holidays = await fetchHolidaysForYears(selectedCountry, new Date().getFullYear(), new Date().getFullYear() + 3);

        // Check if holidays were successfully fetched
        if (!Array.isArray(holidays)) {
            console.error('No holidays data found or error fetching holidays.');
        }

        try {
            // Calculate the business dates
            await calculateBusinessDate();
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
