// js/switch.js

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const copyMessage = document.querySelector('.copy-message'); // Select the correct copy message element
        copyMessage.textContent = 'Copied!';
        copyMessage.style.display = 'block';
        setTimeout(() => {
            copyMessage.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

export function setupSwitchButton() {
    const switchButton = document.getElementById('switchButton');
    const calculatorBox = document.getElementById('calculatorBox');
    const couponExpiryBox = document.getElementById('couponBox'); // Make sure this matches your HTML ID
    const boxTitle = document.getElementById('boxTitle'); // Ensure this matches your HTML ID
    const couponTitle = document.getElementById('couponTitle');
    const couponDateInput = document.getElementById('couponDate');
    const addDaysInput = document.getElementById('addDays');
    const removeExtraDayCheckbox = document.getElementById('cbx-43'); // Corrected ID for checkbox

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

    // Function to calculate expiry date
    function calculateExpiryDate() {
        const startDate = new Date(couponDateInput.value);
        const addDays = parseInt(addDaysInput.value);
        let expiryDate = new Date(startDate);

        // Add days
        expiryDate.setDate(expiryDate.getDate() + addDays);

        // Remove one day if checkbox is checked
        if (removeExtraDayCheckbox.checked) {
            expiryDate.setDate(expiryDate.getDate() - 1);
        }

        // Format expiryDate to text format
        const formattedExpiryDate = `${expiryDate.getFullYear()}-${('0' + (expiryDate.getMonth() + 1)).slice(-2)}-${('0' + expiryDate.getDate()).slice(-2)}`;

        // Update the result field or perform any other action with formattedExpiryDate
        document.getElementById('couponResult').value = formattedExpiryDate;

        // Copy to clipboard functionality
        copyToClipboard(formattedExpiryDate);
    }

    // Event listener for Calculate button
    document.getElementById('couponCalculateButton').addEventListener('click', calculateExpiryDate);
}
