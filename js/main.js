// js/main.js
import { populateCountries, setupEventListeners } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    populateCountries();
    setupEventListeners();
    setupSwitchButton(); // Initialize the switch button functionality
});

function setupSwitchButton() {
    const switchButton = document.getElementById('switchButton');
    const calculatorBox = document.getElementById('calculatorBox');
    const couponExpiryBox = document.getElementById('couponExpiryBox');
    const boxTitle = document.getElementById('boxTitle');
    const couponTitle = document.getElementById('couponTitle');
    
    switchButton.addEventListener('click', () => {
        if (calculatorBox.classList.contains('hidden')) {
            // Show calculator box and hide coupon expiry box
            calculatorBox.classList.remove('hidden');
            couponExpiryBox.classList.add('hidden');
            switchButton.textContent = 'Switch to Coupon Expiry';
            boxTitle.textContent = 'Business Date Calculator';
        } else {
            // Show coupon expiry box and hide calculator box
            calculatorBox.classList.add('hidden');
            couponExpiryBox.classList.remove('hidden');
            switchButton.textContent = 'Switch to ETA Calculator';
            couponTitle.textContent = 'Coupon Expiry';
        }
    });
}
