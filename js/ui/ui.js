import { populateCountries } from './countryUtils.js';
import { getBusinessDays } from './businessDaysUtils.js';
import { calculateBusinessDate } from './dateCalculation.js';

export function populateBusinessDays() {
    const serviceType = document.getElementById('serviceType').value;
    const country = document.getElementById('countrySelect').value;
    const businessDaysInput = document.getElementById('businessDays');

    businessDaysInput.value = getBusinessDays(serviceType, country);
}

export function setupEventListeners() {
    // Event listener for serviceType change
    document.getElementById('serviceType').addEventListener('change', () => {
        populateCountries();
        populateBusinessDays();
    });

    // Event listener for countrySelect change
    document.getElementById('countrySelect').addEventListener('change', populateBusinessDays);

    // Event listener for calculateButton click
    document.getElementById('calculateButton').addEventListener('click', calculateBusinessDate);

    // Event listener for result field click
    document.getElementById('result').addEventListener('click', () => {
        const resultField = document.getElementById('result');
        navigator.clipboard.writeText(resultField.value).then(() => {
            const copyMessageCalculator = document.getElementById('copyMessageCalculator');
            copyMessageCalculator.style.display = 'block';
            setTimeout(() => {
                copyMessageCalculator.style.display = 'none';
            }, 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
    });

    // Event listener for standardResult field click
    document.getElementById('standardResult').addEventListener('click', () => {
        const standardResultField = document.getElementById('standardResult');
        navigator.clipboard.writeText(standardResultField.value).then(() => {
            const copyMessageStandardResult = document.getElementById('copyMessageStandardResult');
            copyMessageStandardResult.style.display = 'block';
            setTimeout(() => {
                copyMessageStandardResult.style.display = 'none';
            }, 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
    });
}
