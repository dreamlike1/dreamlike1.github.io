// calendar/calendar.js

/**
 * Initializes the Fomantic UI Calendar as a date selector
 */
export function initializeDateSelector() {
    // Initialize the calendar with type 'date'
    $('.ui.calendar').calendar({
        type: 'date',
        text: {
            // Custom text for days and months (optional customization)
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        onChange: function(date, text, mode) {
            // Callback function executed when a date is selected or changed
            if (date) {
                // Convert the selected date to yyyy-mm-dd format
                // to match the format used by native date input fields
                const formattedDate = date.toISOString().split('T')[0];
                // Set the value of the native date input field
                document.getElementById('startDate').value = formattedDate;
            } else {
                // If no date is selected, clear the native date input field
                document.getElementById('startDate').value = '';
            }
        }
    });
}
