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
    const resultInput = document.getElementById('result');
    const couponResultInput = document.getElementById('couponResult');
    const calculateButton = document.getElementById('calculateButton');
    const couponCalculateButton = document.getElementById('couponCalculateButton');
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
        boxTitle.textContent = 'Business Date Calculator';
        couponTitle.textContent = 'Coupon Expiry';
    }

    function showCouponExpiryBox() {
        calculatorBox.classList.add('hidden');
        couponExpiryBox.classList.remove('hidden');
        switchButton.textContent = 'Switch to ETA Calculator';
        boxTitle.textContent = 'Coupon Expiry';
        couponTitle.textContent = 'Business Date Calculator';
    }

    calculateButton.addEventListener('click', () => {
        // Your calculation logic for Business Date Calculator
        // Example logic to calculate and display result
        resultInput.value = "Your calculated result";
    });

    couponCalculateButton.addEventListener('click', () => {
        // Your calculation logic for Coupon Expiry
        // Example logic to calculate and display coupon expiry result
        couponResultInput.value = "Your calculated coupon result";
    });

    resultInput.addEventListener('click', () => {
        copyToClipboard(resultInput.value);
    });

    couponResultInput.addEventListener('click', () => {
        copyToClipboard(couponResultInput.value);
    });

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showCopyMessage();
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    function showCopyMessage() {
        copyMessage.style.display = 'block';
        setTimeout(() => {
            copyMessage.style.display = 'none';
        }, 2000);
    }
}
