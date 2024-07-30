// js/switch.js

export function setupSwitchButton() {
    const switchButton = document.getElementById('switchButton');
    const calculatorBox = document.getElementById('calculatorBox');
    const couponExpiryBox = document.getElementById('couponBox');
    let boxTitle = document.getElementById('boxTitle');
    let couponTitle = document.getElementById('couponTitle');
    const couponDateInput = document.getElementById('couponDate');
    const addDaysInput = document.getElementById('addDays');
    const removeExtraDayCheckbox = document.getElementById('cbx-43');
    const couponResultInput = document.getElementById('couponResult');
    const couponCalculateButton = document.getElementById('couponCalculateButton');
    const copyResultButton = document.getElementById('copyCouponResult');
    const copyMessage = document.getElementById('copyMessage');

    switchButton.addEventListener('click', () => {
        if (calculatorBox.classList.contains('hidden')) {
            showCalculatorBox();
        } else {
            showCouponExpiryBox();
        }
    });

    function showCalculatorBox() {
        calculatorBox.classList.remove('hidden');
        couponExpiryBox.classList.add('hidden');
        switchButton.textContent = 'Switch to Coupon Expiry';
        if (boxTitle) boxTitle.textContent = 'Business Date Calculator';
        if (couponTitle) couponTitle.textContent = 'Coupon Expiry';
    }

    function showCouponExpiryBox() {
        calculatorBox.classList.add('hidden');
        couponExpiryBox.classList.remove('hidden');
        switchButton.textContent = 'Switch to ETA Calculator';
        if (boxTitle) boxTitle.textContent = 'Coupon Expiry';
        if (couponTitle) couponTitle.textContent = 'Business Date Calculator';
    }

    couponCalculateButton.addEventListener('click', () => {
        const startDate = new Date(couponDateInput.value);
        const addDays = parseInt(addDaysInput.value);
        let expiryDate = new Date(startDate.setDate(startDate.getDate() + addDays));

        if (removeExtraDayCheckbox.checked) {
            expiryDate.setDate(expiryDate.getDate() - 1);
        }

        couponResultInput.value = formatDate(expiryDate);
    });

    copyResultButton.addEventListener('click', () => {
        couponResultInput.select();
        document.execCommand('copy');
        copyMessage.style.display = 'block';
        setTimeout(() => {
            copyMessage.style.display = 'none';
        }, 2000);
    });

    function formatDate(date) {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
}
