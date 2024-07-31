// Import only the necessary functions from 'holidays.js'
import { isHoliday } from './api/holidays.js';

// Function to format a date as a readable string
export function formatDate(date) {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

// Function to adjust the start date based on checkbox status
function adjustStartDate(startDate, checkboxId, country) {
    let adjustedDate = new Date(startDate);

    const checkbox = document.getElementById(checkboxId);
    if (checkbox && checkbox.checked) {
        do {
            adjustedDate.setDate(adjustedDate.getDate() + 1);
        } while (adjustedDate.getDay() === 0 || adjustedDate.getDay() === 6 || isHoliday(adjustedDate, country));
    }

    return adjustedDate;
}

// Function to calculate the end date after adding a number of business days
export function calculateBusinessDays(startDate, numDays, country) {
    let currentDate = adjustStartDate(startDate, 'cbx-42', country);
    let count = 0;

    while (count < numDays) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6 && !isHoliday(currentDate, country)) {
            count++;
        }
    }

    // Skip holidays on the calculated end date
    while (isHoliday(currentDate, country)) {
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return currentDate;
}
