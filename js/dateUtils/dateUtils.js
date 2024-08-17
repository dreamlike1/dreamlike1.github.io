// businessDayUtils.js
import { isHoliday } from '../api/holidays.js';

// Function to format a date as a readable string
export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}
