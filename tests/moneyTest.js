import currancyFormat from '../scripts/utils/money.js';

console.log('test suite: formatCurrency');
console.log('converts cents to dollars');
if (currancyFormat(2088) === '20.88') {
    console.log('Passed');
} else {
    console.log('Failed')
}
console.log('works with zero(0)')
if (currancyFormat(0) === '0.00') {
    console.log('Passed');
} else {
    console.log('Failed')
}
console.log('rounds to the nearst cents');
if (currancyFormat(5000.5) === '50.01') {
    console.log('Passed');
} else {
    console.log('Failed')
}