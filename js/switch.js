// js/switch.js

export function setupSwitchButton() {
    const switchButton = document.getElementById('switchButton');
    const calculatorBox = document.getElementById('calculatorBox');
    const couponExpiryBox = document.getElementById('couponBox');
    const boxTitle = document.getElementById('boxTitle');
    const couponTitle = document.getElementById('couponTitle');
    const couponDateInput = document.getElementById('couponDate');
    const addDaysInput = document.getElementById('addDays');
    const removeExtraDayCheckbox = document.getElementById('cbx-43');
    const couponResultInput = document.getElementById('couponResult');
    const couponCalculateButton = document.getElementById('couponCalculateButton');

    switchButton.addEventListener('click', () => {
        if (calculatorBox.classList.toggle('hidden')) {
            switchButton.textContent = 'Switch to Coupon Expiry';
            boxTitle.textContent = 'Business Date Calculator';
            couponExpiryBox.classList.add('hidden');
        } else {
            switchButton.textContent = 'Switch to ETA Calculator';
            boxTitle.textContent = 'Coupon Expiry';
            calculatorBox.classList.add('hidden');
        }
    });

    couponCalculateButton.addEventListener('click', () => {
        const startDate = new Date(couponDateInput.value);
        const addDays = parseInt(addDaysInput.value);
        let expiryDate = new Date(startDate.setDate(startDate.getDate() + addDays));

        if (removeExtraDayCheckbox.checked) {
            expiryDate.setDate(expiryDate.getDate() - 1);
        }

        couponResultInput.value = formatDate(expiryDate);
    });

    function formatDate(date) {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
}
