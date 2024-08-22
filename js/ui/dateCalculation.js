// js/ui/dateCalculation.js
import { formatDate } from '../dateUtils/dateUtils.js';
import { calculateBusinessDays } from '../businessDayUtils/businessDayUtils.js';
import { getHolidaysForCountry } from './countryUtils.js';

export async function calculateBusinessDate() {
    let startDateInput = document.getElementById('startDate').value;
    const dateRangeInput = document.getElementById('businessDays').value;
    const selectedCountry = document.getElementById('countrySelect').value;

    // Validate start date
    let startDate = new Date(startDateInput);
    if (!startDateInput || isNaN(startDate.getTime())) {
        console.log('Invalid start date:', startDateInput);
        alert('Please enter a valid start date.');
        return;
    }

    // Validate country and range input
    if (!dateRangeInput) {
        console.log('Invalid date range input:', dateRangeInput);
        alert('Please enter a valid range of business days.');
        return;
    }
    if (!selectedCountry) {
        console.log('No country selected:', selectedCountry);
        alert('Please select a country.');
        return;
    }

    // Fetch holidays for the selected country
    const holidays = await getHolidaysForCountry(selectedCountry);

    // Check if holidays were successfully fetched
    if (!Array.isArray(holidays)) {
        console.error('No holidays data found or error fetching holidays.');
    }

    // Parse the date range input
    let numDaysStart, numDaysEnd;

    // Handle different range formats
    if (dateRangeInput.includes('-')) {
        const ranges = dateRangeInput.split('-').map(Number);
        numDaysStart = ranges[0];
        numDaysEnd = ranges[1];
    } else if (dateRangeInput.includes(',')) {
        const ranges = dateRangeInput.split(',').map(Number);
        numDaysStart = ranges[0];
        numDaysEnd = ranges[1];
    } else {
        numDaysStart = numDaysEnd = Number(dateRangeInput);
    }

    // Log the parsed range
    console.log('Parsed date range:', numDaysStart, numDaysEnd);

    try {
        // Calculate the end dates considering holidays and weekends
        console.log('Calculating end dates...');
        const endDateStart = calculateBusinessDays(startDate, numDaysStart, holidays);
        const endDateEnd = calculateBusinessDays(startDate, numDaysEnd, holidays);

        // Log the intermediate results
        console.log('Intermediate results:');
        console.log(`End Date for ${numDaysStart} business days: ${endDateStart}`);
        console.log(`End Date for ${numDaysEnd} business days: ${endDateEnd}`);

        // Format and display results
        const formattedStart = formatDate(endDateStart);
        const formattedEnd = formatDate(endDateEnd);
        document.getElementById('result').value = `${formattedStart} and ${formattedEnd}`;
        
        // Log the final results
        console.log('Formatted results:');
        console.log(`Start Date End: ${formattedStart}`);
        console.log(`End Date End: ${formattedEnd}`);

        // Special condition for United States
        if (selectedCountry === 'United States') {
            // Handle the special case for the second range '6-7'
            const specialRangeStart = 3;
            const specialRangeEnd = 6;
            const specialEndDateStart = calculateBusinessDays(startDate, specialRangeStart, holidays);
            const specialEndDateEnd = calculateBusinessDays(startDate, specialRangeEnd, holidays);
            
            // Format and display special results in the second input
            const specialFormattedStart = formatDate(specialEndDateStart);
            const specialFormattedEnd = formatDate(specialEndDateEnd);
            document.getElementById('standardResult').value = `${specialFormattedStart} and ${specialFormattedEnd}`;

            // Log the special case results
            console.log('Special case results:');
            console.log(`Special Start Date End: ${specialFormattedStart}`);
            console.log(`Special End Date End: ${specialFormattedEnd}`);
        }

    } catch (error) {
        console.error('Error calculating business dates:', error);
        alert('Error calculating business dates. Please check the input and try again.');
    }

    // If no holidays were found, open the external date calculator in a new tab
    if (!holidays || holidays.length === 0) {
        window.open('https://www.timeanddate.com/date/weekdayadd.html', '_blank');
    }
}
