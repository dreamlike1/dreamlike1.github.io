import { countryOptions } from './api/countryData.js';
import { fetchHolidays } from './api/holidays.js'; // Updated path
import {
	calculateBusinessDays as utilsCalculateBusinessDays,
	formatDate,
} from './dateUtils.js'; // Directly import functions

// Assume holidays are stored globally or in a shared state
let holidays = [];

// Utility function to check if a date is a holiday or weekend
function isNonBusinessDay(date, holidays) {
	const dayOfWeek = date.getDay();
	const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
	const isHoliday = holidays.some(holiday => {
		const holidayDate = new Date(holiday.date);
		return date.getTime() === holidayDate.getTime();
	});
	return isWeekend || isHoliday;
}

// Function to calculate business days while skipping weekends and holidays
function calculateBusinessDays(startDate, numDays, holidays) {
	// debugger;
	let currentDate = new Date(startDate);
	let daysAdded = 0;
	const past5pmCheckbox = document.getElementById('cbx-42');
	// Adjust the end date based on the checkbox state
	if (past5pmCheckbox.checked) {
		currentDate.setDate(currentDate.getDate() + 1);
	}

	while (daysAdded < numDays) {
		currentDate.setDate(currentDate.getDate() + 1);

		// Check if the current date is a non-business day
		if (!isNonBusinessDay(currentDate, holidays)) {
			daysAdded++;
		}
	}

	return currentDate;
}

export async function populateCountries() {
	const countrySelect = document.getElementById('countrySelect');
	const selectedService = document.getElementById('serviceType').value;
	const countries = countryOptions[selectedService] || [];

	countrySelect.innerHTML = '<option value="">Select a country</option>'; // Add default option

	for (const country of countries) {
		// Fetch holidays and update global holidays array
		holidays = await fetchHolidays(country, new Date().getFullYear());
	}

	countries.forEach(country => {
		const option = document.createElement('option');
		option.value = country;
		option.textContent = country;
		countrySelect.appendChild(option);
	});
}

export function populateBusinessDays() {
	const serviceType = document.getElementById('serviceType').value;
	const country = document.getElementById('countrySelect').value;
	const businessDaysInput = document.getElementById('businessDays');

	if (serviceType === 'expressFree') {
		businessDaysInput.value = '2-3';
	} else if (serviceType === 'standard') {
		if (country === 'New Zealand') {
			businessDaysInput.value = '7-10';
		} else if (country === 'United States') {
			businessDaysInput.value = '';
		} else {
			businessDaysInput.value = '5-8';
		}
	} else if (serviceType === 'economy') {
		if (country === 'United States') {
			businessDaysInput.value = '7-14';
		} else {
			businessDaysInput.value = '';
		}
	} else if (serviceType === 'collection') {
		if (country === 'United States') {
			businessDaysInput.value = '1-3';
		} else if (country === 'Canada') {
			businessDaysInput.value = '3-4';
		} else {
			businessDaysInput.value = '';
		}
	} else if (serviceType === 'expressPaid') {
		if (country === 'Brazil') {
			businessDaysInput.value = '2-5';
		} else if (country === 'New Zealand') {
			businessDaysInput.value = '4-7';
		} else {
			businessDaysInput.value = '2-3';
		}
	} else {
		businessDaysInput.value = '';
	}
}

export async function calculateBusinessDate() {
	let startDate = new Date(document.getElementById('startDate').value);
	const dateRangeInput = document.getElementById('businessDays').value;
	const selectedCountry = document.getElementById('countrySelect').value;

	if (!dateRangeInput || !selectedCountry || isNaN(startDate.getTime())) {
		alert(
			'Please enter a valid start date, range of business days, and select a country.'
		);
		return;
	}

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

	// Fetch holidays for the selected country
	holidays = await fetchHolidays(selectedCountry, startDate.getFullYear());

	// Calculate the end dates considering holidays and weekends
	const endDateStart = calculateBusinessDays(startDate, numDaysStart, holidays);
	const endDateEnd = calculateBusinessDays(startDate, numDaysEnd, holidays);

	const formattedStart = formatDate(endDateStart);
	const formattedEnd = formatDate(endDateEnd);
	document.getElementById(
		'result'
	).value = `Between ${formattedStart} and ${formattedEnd}`;
}

export function setupEventListeners() {
	document.getElementById('serviceType').addEventListener('change', () => {
		populateCountries();
		populateBusinessDays();
	});
	document
		.getElementById('countrySelect')
		.addEventListener('change', populateBusinessDays);
	document
		.getElementById('calculateButton')
		.addEventListener('click', calculateBusinessDate);
	document.getElementById('result').addEventListener('click', () => {
		const resultField = document.getElementById('result');
		navigator.clipboard.writeText(resultField.value).then(() => {
			const copyMessageCalculator = document.getElementById(
				'copyMessageCalculator'
			);
			copyMessageCalculator.style.display = 'block';
			setTimeout(() => {
				copyMessageCalculator.style.display = 'none';
			}, 2000);
		});
	});
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
	populateCountries();
	setupEventListeners();
});
