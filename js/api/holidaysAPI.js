

// holidaysAPI.js
const holidays = {
    2024: {
        BN: [  // Brunei
            "New Year's Day - January 1",
            "Chinese New Year - February 10",
            "Hari Raya Aidilfitri - April 10",
            "Hari Raya Aidiladha - June 17",
            "Awal Muharram - July 7",
            "Maulidur Rasul - September 15",
            "National Day - February 23",
            "Sultan's Birthday - July 15"
        ],
        AI: [  // Anguilla
            "New Year's Day - January 1",
            "Heritage Day - May 30",
            "Queen's Birthday - June 10",
            "Emancipation Day - August 5",
            "Anguilla Day - May 30",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        AG: [  // Antigua and Barbuda
            "New Year's Day - January 1",
            "Antigua and Barbuda Independence Day - November 1",
            "Carnival Monday - August 5",
            "Carnival Tuesday - August 6",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        AW: [  // Aruba
            "New Year's Day - January 1",
            "Carnival - February 12",
            "Good Friday - March 29",
            "King's Day - April 27",
            "Labor Day - May 1",
            "Ascension Day - May 30",
            "Whit Monday - June 10",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        CW: [  // Curaçao
            "New Year's Day - January 1",
            "Carnival - February 12",
            "Good Friday - March 29",
            "Easter Monday - April 1",
            "King's Day - April 27",
            "Labor Day - May 1",
            "Ascension Day - May 30",
            "Whit Monday - June 10",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        DM: [  // Dominica
            "New Year's Day - January 1",
            "Carnival - February 12",
            "Good Friday - March 29",
            "Easter Monday - April 1",
            "Labor Day - May 1",
            "Independence Day - November 3",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        GF: [  // French Guiana
            "New Year's Day - January 1",
            "Carnival - February 12",
            "Good Friday - March 29",
            "Easter Monday - April 1",
            "Labour Day - May 1",
            "Bastille Day - July 14",
            "Assumption Day - August 15",
            "All Saints' Day - November 1",
            "Christmas Day - December 25"
        ],
        MY: [  // Malaysia
            "New Year's Day - January 1",
            "Chinese New Year - February 10",
            "Hari Raya Aidilfitri - April 10",
            "Hari Raya Aidiladha - June 17",
            "Awal Muharram - July 7",
            "Maulidur Rasul - September 15",
            "Deepavali - October 31",
            "Christmas Day - December 25",
            "Labour Day - May 1"
        ],
        GP: [  // Guadeloupe
            "New Year's Day - January 1",
            "Carnival - February 12",
            "Easter Monday - April 1",
            "Labour Day - May 1",
            "Bastille Day - July 14",
            "Assumption Day - August 15",
            "All Saints' Day - November 1",
            "Christmas Day - December 25"
        ],
        PH: [  // Philippines
            "New Year's Day - January 1",
            "Maundy Thursday - March 28",
            "Good Friday - March 29",
            "Araw ng Kagitingan - April 9",
            "Labor Day - May 1",
            "Independence Day - June 12",
            "National Heroes Day - August 26",
            "Bonifacio Day - November 30",
            "Christmas Day - December 25",
            "Rizal Day - December 30"
        ],
        KN: [  // Saint Kitts and Nevis
            "New Year's Day - January 1",
            "Good Friday - March 29",
            "Easter Monday - April 1",
            "Labor Day - May 1",
            "Independence Day - September 19",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        LC: [  // Saint Lucia
            "New Year's Day - January 1",
            "Good Friday - March 29",
            "Easter Monday - April 1",
            "Labor Day - May 1",
            "Independence Day - February 22",
            "Saint Lucia Day - December 13",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        VC: [  // Saint Vincent and the Grenadines
            "New Year's Day - January 1",
            "Good Friday - March 29",
            "Easter Monday - April 1",
            "Labor Day - May 1",
            "Independence Day - October 27",
            "Bequia Day - January 21",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        TT: [  // Trinidad and Tobago
            "New Year's Day - January 1",
            "Carnival Monday - February 12",
            "Carnival Tuesday - February 13",
            "Good Friday - March 29",
            "Easter Monday - April 1",
            "Labour Day - May 1",
            "Independence Day - August 31",
            "Republic Day - September 24",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        TC: [  // Turks and Caicos Islands
            "New Year's Day - January 1",
            "Good Friday - March 29",
            "Easter Monday - April 1",
            "Labour Day - May 1",
            "Queen's Birthday - June 10",
            "Constitution Day - October 5",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        VI: [  // U.S. Virgin Islands
            "New Year's Day - January 1",
            "Three Kings Day - January 6",
            "Martin Luther King Jr. Day - January 15",
            "President's Day - February 19",
            "Emancipation Day - July 3",
            "Independence Day - July 4",
            "Labor Day - September 2",
            "Columbus Day - October 14",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ]
    },
    "2025": {
        "BN": [  // Brunei
            "New Year's Day - January 1",
            "Chinese New Year - February 10",
            "Hari Raya Aidilfitri - April 10",
            "Hari Raya Aidiladha - June 17",
            "Awal Muharram - July 7",
            "Maulidur Rasul - September 15",
            "National Day - February 23",
            "Sultan's Birthday - July 15"
        ],
        "AI": [  // Anguilla
            "New Year's Day - January 1",
            "Heritage Day - May 30",
            "Queen's Birthday - June 10",
            "Emancipation Day - August 5",
            "Anguilla Day - May 30",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "AG": [  // Antigua and Barbuda
            "New Year's Day - January 1",
            "Antigua and Barbuda Independence Day - November 1",
            "Carnival Monday - August 5",
            "Carnival Tuesday - August 6",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "AW": [  // Aruba
            "New Year's Day - January 1",
            "Carnival - February 12",
            "Good Friday - April 18",
            "King's Day - April 27",
            "Labor Day - May 1",
            "Ascension Day - May 30",
            "Whit Monday - June 10",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "CW": [  // Curaçao
            "New Year's Day - January 1",
            "Carnival - February 12",
            "Good Friday - April 18",
            "Easter Monday - April 21",
            "King's Day - April 27",
            "Labor Day - May 1",
            "Ascension Day - May 30",
            "Whit Monday - June 10",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "DM": [  // Dominica
            "New Year's Day - January 1",
            "Carnival - February 12",
            "Good Friday - April 18",
            "Easter Monday - April 21",
            "Labor Day - May 1",
            "Independence Day - November 3",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "GF": [  // French Guiana
            "New Year's Day - January 1",
            "Carnival - February 12",
            "Good Friday - April 18",
            "Easter Monday - April 21",
            "Labour Day - May 1",
            "Bastille Day - July 14",
            "Assumption Day - August 15",
            "All Saints' Day - November 1",
            "Christmas Day - December 25"
        ],
        "MY": [  // Malaysia
            "New Year's Day - January 1",
            "Chinese New Year - February 10",
            "Hari Raya Aidilfitri - April 10",
            "Hari Raya Aidiladha - June 17",
            "Awal Muharram - July 7",
            "Maulidur Rasul - September 15",
            "Deepavali - October 31",
            "Christmas Day - December 25",
            "Labour Day - May 1"
        ],
        "GP": [  // Guadeloupe
            "New Year's Day - January 1",
            "Carnival - February 12",
            "Easter Monday - April 21",
            "Labour Day - May 1",
            "Bastille Day - July 14",
            "Assumption Day - August 15",
            "All Saints' Day - November 1",
            "Christmas Day - December 25"
        ],
        "PH": [  // Philippines
            "New Year's Day - January 1",
            "Maundy Thursday - April 17",
            "Good Friday - April 18",
            "Araw ng Kagitingan - April 9",
            "Labor Day - May 1",
            "Independence Day - June 12",
            "National Heroes Day - August 26",
            "Bonifacio Day - November 30",
            "Christmas Day - December 25",
            "Rizal Day - December 30"
        ],
        "KN": [  // Saint Kitts and Nevis
            "New Year's Day - January 1",
            "Good Friday - April 18",
            "Easter Monday - April 21",
            "Labor Day - May 1",
            "Independence Day - September 19",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "LC": [  // Saint Lucia
            "New Year's Day - January 1",
            "Good Friday - April 18",
            "Easter Monday - April 21",
            "Labor Day - May 1",
            "Independence Day - February 22",
            "Saint Lucia Day - December 13",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "VC": [  // Saint Vincent and the Grenadines
            "New Year's Day - January 1",
            "Good Friday - April 18",
            "Easter Monday - April 21",
            "Labor Day - May 1",
            "Independence Day - October 27",
            "Bequia Day - January 21",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "TT": [  // Trinidad and Tobago
            "New Year's Day - January 1",
            "Carnival Monday - February 12",
            "Carnival Tuesday - February 13",
            "Good Friday - April 18",
            "Easter Monday - April 21",
            "Labour Day - May 1",
            "Independence Day - August 31",
            "Republic Day - September 24",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "TC": [  // Turks and Caicos Islands
            "New Year's Day - January 1",
            "Good Friday - April 18",
            "Easter Monday - April 21",
            "Labour Day - May 1",
            "Queen's Birthday - June 10",
            "Constitution Day - October 5",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "VI": [  // U.S. Virgin Islands
            "New Year's Day - January 1",
            "Three Kings Day - January 6",
            "Martin Luther King Jr. Day - January 15",
            "President's Day - February 19",
            "Emancipation Day - July 3",
            "Independence Day - July 4",
            "Labor Day - September 2",
            "Columbus Day - October 14",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ]
    },
    "2026": {
        "BN": [  // Brunei
            "New Year's Day - January 1",
            "Chinese New Year - February 10",
            "Hari Raya Aidilfitri - March 31",
            "Hari Raya Aidiladha - June 7",
            "Awal Muharram - June 27",
            "Maulidur Rasul - September 5",
            "National Day - February 23",
            "Sultan's Birthday - July 15"
        ],
        "AI": [  // Anguilla
            "New Year's Day - January 1",
            "Heritage Day - May 30",
            "Queen's Birthday - June 10",
            "Emancipation Day - August 5",
            "Anguilla Day - May 30",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "AG": [  // Antigua and Barbuda
            "New Year's Day - January 1",
            "Antigua and Barbuda Independence Day - November 1",
            "Carnival Monday - August 4",
            "Carnival Tuesday - August 5",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "AW": [  // Aruba
            "New Year's Day - January 1",
            "Carnival - February 2",
            "Good Friday - April 10",
            "King's Day - April 27",
            "Labor Day - May 1",
            "Ascension Day - May 30",
            "Whit Monday - June 1",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "CW": [  // Curaçao
            "New Year's Day - January 1",
            "Carnival - February 2",
            "Good Friday - April 10",
            "Easter Monday - April 13",
            "King's Day - April 27",
            "Labor Day - May 1",
            "Ascension Day - May 30",
            "Whit Monday - June 1",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "DM": [  // Dominica
            "New Year's Day - January 1",
            "Carnival - February 2",
            "Good Friday - April 10",
            "Easter Monday - April 13",
            "Labor Day - May 1",
            "Independence Day - November 3",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "GF": [  // French Guiana
            "New Year's Day - January 1",
            "Carnival - February 2",
            "Good Friday - April 10",
            "Easter Monday - April 13",
            "Labour Day - May 1",
            "Bastille Day - July 14",
            "Assumption Day - August 15",
            "All Saints' Day - November 1",
            "Christmas Day - December 25"
        ],
        "MY": [  // Malaysia
            "New Year's Day - January 1",
            "Chinese New Year - February 10",
            "Hari Raya Aidilfitri - March 31",
            "Hari Raya Aidiladha - June 7",
            "Awal Muharram - June 27",
            "Maulidur Rasul - September 5",
            "Deepavali - October 30",
            "Christmas Day - December 25",
            "Labour Day - May 1"
        ],
        "GP": [  // Guadeloupe
            "New Year's Day - January 1",
            "Carnival - February 2",
            "Easter Monday - April 13",
            "Labour Day - May 1",
            "Bastille Day - July 14",
            "Assumption Day - August 15",
            "All Saints' Day - November 1",
            "Christmas Day - December 25"
        ],
        "PH": [  // Philippines
            "New Year's Day - January 1",
            "Maundy Thursday - April 2",
            "Good Friday - April 3",
            "Araw ng Kagitingan - April 9",
            "Labor Day - May 1",
            "Independence Day - June 12",
            "National Heroes Day - August 26",
            "Bonifacio Day - November 30",
            "Christmas Day - December 25",
            "Rizal Day - December 30"
        ],
        "KN": [  // Saint Kitts and Nevis
            "New Year's Day - January 1",
            "Good Friday - April 10",
            "Easter Monday - April 13",
            "Labor Day - May 1",
            "Independence Day - September 19",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "LC": [  // Saint Lucia
            "New Year's Day - January 1",
            "Good Friday - April 10",
            "Easter Monday - April 13",
            "Labor Day - May 1",
            "Independence Day - February 22",
            "Saint Lucia Day - December 13",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "VC": [  // Saint Vincent and the Grenadines
            "New Year's Day - January 1",
            "Good Friday - April 10",
            "Easter Monday - April 13",
            "Labor Day - May 1",
            "Independence Day - October 27",
            "Bequia Day - January 21",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "TT": [  // Trinidad and Tobago
            "New Year's Day - January 1",
            "Carnival Monday - February 2",
            "Carnival Tuesday - February 3",
            "Good Friday - April 10",
            "Easter Monday - April 13",
            "Labour Day - May 1",
            "Independence Day - August 31",
            "Republic Day - September 24",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "TC": [  // Turks and Caicos Islands
            "New Year's Day - January 1",
            "Good Friday - April 10",
            "Easter Monday - April 13",
            "Labour Day - May 1",
            "Queen's Birthday - June 10",
            "Constitution Day - October 5",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ],
        "VI": [  // U.S. Virgin Islands
            "New Year's Day - January 1",
            "Three Kings Day - January 6",
            "Martin Luther King Jr. Day - January 20",
            "President's Day - February 16",
            "Emancipation Day - July 3",
            "Independence Day - July 4",
            "Labor Day - September 7",
            "Columbus Day - October 13",
            "Christmas Day - December 25",
            "Boxing Day - December 26"
        ]
    }
};

/**
 * Transform local API holiday data to match the Date Nager API format.
 * @param {Array} holidays - The array of holiday strings.
 * @param {string} countryCode - The country code.
 * @returns {Array} - Transformed holidays array.
 */
function transformLocalAPIResponse(holidays, countryCode) {
    return holidays.map(holiday => {
        const [name, date] = holiday.split(' - ');
        return {
            date: `2024-${convertDateToISO(date)}`, // Adjust year dynamically if needed
            localName: name,
            name: name,
            countryCode: countryCode
        };
    });
}

/**
 * Converts a date string (e.g., "January 1") to ISO format (e.g., "2024-01-01").
 * @param {string} date - The date string to convert.
 * @returns {string} - The date in ISO format.
 */
function convertDateToISO(date) {
    const [month, day] = date.split(' ');
    const monthMap = {
        January: '01',
        February: '02',
        March: '03',
        April: '04',
        May: '05',
        June: '06',
        July: '07',
        August: '08',
        September: '09',
        October: '10',
        November: '11',
        December: '12'
    };
    return `${monthMap[month]}-${String(day).padStart(2, '0')}`;
}

/**
 * Fetch holidays from the local API.
 * @param {string} countryCode - The country code for the holidays.
 * @param {number} year - The year for which to fetch holidays.
 * @returns {Promise<Array>} - A promise that resolves to an array of holidays.
 */
export async function fetchHolidaysFromLocalAPI(countryCode, year) {
    return new Promise((resolve, reject) => {
        // Simulate async data fetching
        setTimeout(() => {
            const countryHolidays = holidays[year] ? holidays[year][countryCode] : null;

            if (countryHolidays) {
                // Transform data to match the Date Nager API format
                const transformedHolidays = transformLocalAPIResponse(countryHolidays, countryCode);
                resolve(transformedHolidays);
            } else {
                console.error(`No holidays data available for the country code: ${countryCode}`);
                reject(new Error(`No holidays data available for the country code: ${countryCode}`));
            }
        }, 1000); // Simulate network delay
    });
}
