export function currancyFormat(priceInCents) {
    return (Math.round(priceInCents) / 100).toFixed(2);
};