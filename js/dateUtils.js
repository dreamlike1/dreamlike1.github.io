// js/dateUtils.js
import { isHoliday } from './api/holidays.js'; // Adjust if necessary
import { fetchHolidays } from './api/holidays.js'; // Adjust if necessary

export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

export function calculateBusinessDays(startDate, numDays, country) {
    let currentDate = new Date(startDate);
    let count = 0;

    while (count < numDays) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6 && !isHoliday(currentDate, country)) {
            count++;
        }
    }

    while (isHoliday(currentDate, country)) {
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return currentDate;
}
