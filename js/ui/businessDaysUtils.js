// businessDaysUtils.js
export function getBusinessDays(serviceType, country) {
    const businessDays = {
        expressFree: '2-3',
        standard: {
            'New Zealand': '7-10',
            'United States': '',
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
            return businessDays[serviceType][country] || businessDays[serviceType].default;
        }
        return businessDays[serviceType];
    }
    return '';
}
