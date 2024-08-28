import { populateCountries } from './ui/countryUtils.js';
import { setupEventListeners } from './eventHandlers/eventHandlers.js';
import { setupSwitchButton } from './switch/switch.js';
import { initializeTimezone } from './timezone/timezone.js';
import { initializeDateSelector } from './calendar/calendar.js';
import { initializeResultsVisibility } from './resultsVisibility/resultsVisibility.js';

document.addEventListener('DOMContentLoaded', () => {
    const defaultServiceType = 'expressPaid';

    function formatDateToWorded(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    function setTodayDate() {
        const today = new Date();
        const formattedDate = formatDateToWorded(today);
        document.getElementById('couponDate').value = formattedDate;
    }

    // Initialize Semantic UI dropdowns and popups
    $('.ui.dropdown').dropdown();
    $('.result-field').popup({
        on: 'hover',
        variation: 'wide',
        position: 'right center'
    });

    populateCountries(defaultServiceType).then(() => {
        $('#countrySelect').dropdown('refresh');
    }).catch(error => {
        console.error('Error populating countries:', error);
    });

    setupEventListeners();
    setupSwitchButton();
    initializeTimezone();
    initializeDateSelector();
    initializeResultsVisibility();

    setTodayDate();
});
