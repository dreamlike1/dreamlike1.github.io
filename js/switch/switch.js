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
        boxTitle.textContent = 'Business Date Calculator';
        couponTitle.textContent = 'Coupon Expiry';
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

    couponResultInput.addEventListener('click', () => {
        navigator.clipboard.writeText(couponResultInput.value).then(() => {
            const copyMessageCoupon = document.getElementById('copyMessageCoupon');
            copyMessageCoupon.style.display = 'block';
            setTimeout(() => {
                copyMessageCoupon.style.display = 'none';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

    function formatDate(date) {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
}
