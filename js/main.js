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

    function updatePopups() {
        const serviceType = $('#serviceType').val();
        const country = $('#countrySelect').val();

        // Remove existing popups
        $('.result-field').popup('destroy');

        // Show popups only if service type is 'standard' and country is 'united states'
        if (serviceType === 'Standard' && country === 'United States') {
            $('.result-field').popup({
                on: 'hover',
                variation: 'wide',
                position: 'top center',
                content: function() {
                    const id = $(this).attr('id');
                    return id === 'result' ? 'test1' : 'test2';
                }
            });
        }
    }

    // Initialize Semantic UI dropdowns
    $('.ui.dropdown').dropdown({
        onChange: function(value, text, $selectedItem) {
            updatePopups();
        }
    });

    // Initialize Semantic UI popups
    updatePopups(); // Call initially to set up based on default values

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
