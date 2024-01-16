import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isWeekend from '../scripts/utils/isWeekend.js';

export const deliveryOptions = [{
    id: '1',
    days: 7,
    priceCents: 0
}, {
    id: '2',
    days: 3,
    priceCents: 499
}, {
    id: '3',
    days: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let matchingDeliveryOption;
    deliveryOptions.forEach(deliveryOption => {
        if (deliveryOption.id === deliveryOptionId) {
            matchingDeliveryOption = deliveryOption;
        }
    });
    return matchingDeliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
    let daysUntilDelivery = deliveryOption.days;
    let deliveryDate = dayjs();

    while (daysUntilDelivery > 0) {
        deliveryDate = deliveryDate.add(1, 'days');
        
        if (!isWeekend(deliveryDate)){
            daysUntilDelivery--;
        }
    }

    const deliveryDateString= deliveryDate.format('dddd, MMMM D');

    return deliveryDateString;
}