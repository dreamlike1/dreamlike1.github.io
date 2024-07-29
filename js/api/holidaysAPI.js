
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
    }
};

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
                resolve(countryHolidays);
            } else {
                console.error(`No holidays data available for the country code: ${countryCode}`);
                reject(new Error(`No holidays data available for the country code: ${countryCode}`));
            }
        }, 1000); // Simulate network delay
    });
}
