// js/switch.js

export function setupSwitchButton() {
    const switchButton = document.getElementById('switchButton');
    const calculatorBox = document.getElementById('calculatorBox');
    const couponExpiryBox = document.getElementById('couponBox'); // Make sure this matches your HTML ID
    const boxTitle = document.getElementById('boxTitle'); // Ensure this matches your HTML ID
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
