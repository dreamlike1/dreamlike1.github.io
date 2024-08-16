// businessDaysUtils.js
export function getBusinessDays(serviceType, country) {
    const businessDays = {
        expressFree: '2-3',
        standard: {
            'New Zealand': '7-10',
            'United States': '5-8',
            default: '5-8'
        },
        economy: {
            'United States': '7-14',
            default: ''
        },
        collection: {
            'United States': '1-3',
            'Canada': '3-4',
            default: ''
        },
        expressPaid: {
            'Brazil': '2-5',
            'New Zealand': '4-7',
            default: '2-3'
        }
    };

    if (businessDays[serviceType]) {
        if (typeof businessDays[serviceType] === 'object') {
            const result = businessDays[serviceType][country];
            if (Array.isArray(result)) {
                return result.join(' & ');  // Join ranges with ' & ' if multiple ranges are provided
            }
            return result || businessDays[serviceType].default;
        }
        return businessDays[serviceType];
    }
    return '';
}
