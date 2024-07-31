// Import only the necessary functions from 'holidays.js'
import { isHoliday } from './api/holidays.js';

/**
 * Formats a date as a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date) {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Adjusts the start date based on the checkbox status.
 * If the checkbox with the given ID is checked, increment the start date
 * by one day, skipping weekends and holidays.
 * @param {Date} startDate - The original start date.
 * @param {string} checkboxId - The ID of the checkbox element.
 * @param {string} country - The country code for holiday checking.
 * @returns {Date} - The adjusted start date.
 */
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

/**
 * Calculates the end date after adding a specified number of business days
 * to the start date. Business days are considered as weekdays that are not
 * holidays.
 * @param {Date} startDate - The initial start date.
 * @param {number} numDays - The number of business days to add.
 * @param {string} country - The country code for holiday checking.
 * @returns {Date} - The calculated end date.
 */
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
