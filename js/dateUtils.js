// Import only the necessary functions from 'holidays.js'
import { isHoliday } from './api/holidays.js';

// Function to format a date as a readable string
export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Function to calculate the end date after adding a number of business days
export function calculateBusinessDays(startDate, numDays, country) {
    let currentDate = new Date(startDate);
    let count = 0;

    while (count < numDays) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6 && !isHoliday(currentDate, country)) {
            count++;
        }
    }

    // Skip over any holidays that might fall on the calculated end date
    while (isHoliday(currentDate, country)) {
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return currentDate;
}
