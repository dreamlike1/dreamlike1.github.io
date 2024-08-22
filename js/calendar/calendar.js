export function initializeDateSelector(holidays = []) {
    // Initialize the calendar with type 'date'
    $('.ui.calendar').calendar({
        type: 'date',
        text: {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        onChange: function(date, text, mode) {
            if (date) {
                const formattedDate = date.toISOString().split('T')[0];
                document.getElementById('startDate').value = formattedDate;
            } else {
                document.getElementById('startDate').value = '';
            }
        },
        // Highlight holidays
        eventDates: holidays.map(holiday => ({
            date: new Date(holiday.date),
            message: holiday.name,
            class: 'holiday', // Use a CSS class for styling
            variation: 'holiday' // Tooltip variation (if supported)
        })),
        // Add custom class for weekends
        onRenderCell: function(date, cell, cellDate) {
            const dayOfWeek = cellDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 = Sunday, 6 = Saturday
                cell.addClass('weekend');
            }
        }
    });
}
