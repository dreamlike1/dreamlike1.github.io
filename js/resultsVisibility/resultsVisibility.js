// js/resultsVisibility.js

export function initializeResultsVisibility() {
    $('#serviceType').on('change', handleVisibilityChange);
    $('#countrySelect').on('change', handleVisibilityChange);
}

function handleVisibilityChange() {
    const serviceType = $('#serviceType').val();
    const country = $('#countrySelect').val();

    // Log the current values of serviceType and country
    console.log(`Service Type: ${serviceType}`);
    console.log(`Country: ${country}`);

    // Always show #result but hide its text
    $('#result').removeClass('hidden');
    $('#result').val(''); // Hide text by setting it to empty

    // Default to hiding #resultText1 and #resultText2
    $('#resultText1').addClass('hidden');
    $('#resultText2').addClass('hidden');
    $('#standardResultField').addClass('hidden');
    $('#standardResult').addClass('hidden');

    // Show additional fields if the conditions are met
    if (serviceType === 'standard' && country === 'United States') {
        // Log that the conditions are met
        console.log('Conditions met: Service Type is "standard" and Country is "United States".');

        $('#resultText1').text('Result for 3-6 Business Days'); // Set text for #resultText1
        $('#resultText1').removeClass('hidden'); // Show #resultText1

        $('#resultText2').text('Result for 5-8 Business Days');
        $('#resultText2').removeClass('hidden'); // Show #resultText2

        $('#standardResultField').removeClass('hidden');
        $('#standardResult').removeClass('hidden');
    } else {
        // Log that the conditions are not met and display the current selections
        console.log('Conditions not met:');
        console.log(`Current Service Type: ${serviceType}`);
        console.log(`Current Country: ${country}`);
    }
}
