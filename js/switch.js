// Function to handle copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const copyMessage = document.querySelector('.copy-message.show');
        if (copyMessage) {
            copyMessage.classList.remove('show');
        }
        setTimeout(() => {
            copyMessage.classList.add('show');
            setTimeout(() => {
                copyMessage.classList.remove('show');
            }, 2000);
        }, 50); // slight delay to ensure the message appears after removal
    });
}

// Event listener for copying result in calculatorBox
document.getElementById('result').addEventListener('click', () => {
    copyToClipboard(document.getElementById('result').value);
});

// Event listener for copying result in couponBox
document.getElementById('couponResult').addEventListener('click', () => {
    copyToClipboard(document.getElementById('couponResult').value);
});

// Function to calculate expiry date in couponBox and format result
function calculateExpiryDate() {
    const startDate = new Date(document.getElementById('couponDate').value);
    const addDays = parseInt(document.getElementById('addDays').value);
    let expiryDate = new Date(startDate);

    // Add days
    expiryDate.setDate(expiryDate.getDate() + addDays);

    // Remove one day if checkbox is checked
    if (document.getElementById('cbx-43').checked) {
        expiryDate.setDate(expiryDate.getDate() - 1);
    }

    // Format expiryDate to text format (e.g., Jan 12 2024)
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const formattedExpiryDate = `${months[expiryDate.getMonth()]} ${expiryDate.getDate()} ${expiryDate.getFullYear()}`;

    // Update the couponResult field with formattedExpiryDate
    document.getElementById('couponResult').value = formattedExpiryDate;
}

// Event listener for Calculate button in couponBox
document.getElementById('couponCalculateButton').addEventListener('click', calculateExpiryDate);

