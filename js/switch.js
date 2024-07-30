// js/switch.js

// Function to handle setup of switch button and related functionality
export function setupSwitchButton() {
    const switchButton = document.getElementById('switchButton');
    const calculatorBox = document.getElementById('calculatorBox');
    const couponExpiryBox = document.getElementById('couponBox');
    const boxTitle = document.getElementById('calculatorBox').querySelector('h1');
    const couponTitle = document.getElementById('couponBox').querySelector('h1');
    const resultInput = document.getElementById('businessDays');
    const couponResultInput = document.getElementById('addDays');
    const calculateButton = document.getElementById('calculateButton');
    const couponCalculateButton = document.getElementById('couponCalculateButton');
    const copyMessage = document.getElementById('copyMessage');

    // Event listener for switch button
    switchButton.addEventListener('click', () => {
        if (calculatorBox.classList.contains('hidden')) {
            showCalculatorBox();
        } else {
            showCouponExpiryBox();
        }
    });

    // Function to show calculator box and update titles
    function showCalculatorBox() {
        calculatorBox.classList.remove('hidden');
        couponExpiryBox.classList.add('hidden');
        switchButton.textContent = 'Switch to Coupon Expiry';
        boxTitle.textContent = 'Business Date Calculator';
        couponTitle.textContent = 'Coupon Expiry';
    }

    // Function to show coupon expiry box and update titles
    function showCouponExpiryBox() {
        calculatorBox.classList.add('hidden');
        couponExpiryBox.classList.remove('hidden');
        switchButton.textContent = 'Switch to Business Date Calculator';
        boxTitle.textContent = 'Coupon Expiry';
        couponTitle.textContent = 'Business Date Calculator';
    }

    // Event listener for calculate button in calculator box
    calculateButton.addEventListener('click', () => {
        // Placeholder logic for calculator button click
        resultInput.value = "Your calculated result";
    });

    // Event listener for calculate button in coupon expiry box
    couponCalculateButton.addEventListener('click', () => {
        // Placeholder logic for coupon expiry button click
        couponResultInput.value = "Your calculated coupon result";
    });

    // Event listener for copying result in calculator box
    resultInput.addEventListener('click', () => {
        copyToClipboard(resultInput.value);
    });

    // Event listener for copying result in coupon expiry box
    couponResultInput.addEventListener('click', () => {
        copyToClipboard(couponResultInput.value);
    });

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showCopyMessage();
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    // Function to display "Copied!" message
    function showCopyMessage() {
        copyMessage.style.display = 'block';
        setTimeout(() => {
            copyMessage.style.display = 'none';
        }, 2000);
    }
}
