import { cart } from "../../data/cart.js";
import { products, getMatchingProduct } from "../../data/products.js";
import { currancyFormat } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
    let matchingItems = [];
    let itemsCost = 0;
    let deliveryCosts = [];
    let deliveryCost = 0;

    cart.forEach(item => {
        const matichingItem = getMatchingProduct(item.productId);
        itemsCost += matichingItem.priceCents * item.quantity;
        matchingItems.push({price: matichingItem.priceCents, quantity: item.quantity});

        const deliveryOption = getDeliveryOption(item.deliveryOptionId);
        deliveryCosts.push(deliveryOption.priceCents);
    });

    deliveryCosts.forEach( cost => {
        if (cost > deliveryCost) {
            deliveryCost = cost;
        }
    });

    const costBeforTax = itemsCost + deliveryCost;
    const taxCost = costBeforTax * 0.1;
    const totalCost = costBeforTax + taxCost;

    let paymentSummaryHTML = 
    `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money js-order-cost-sum">$${currancyFormat(itemsCost)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currancyFormat(deliveryCost)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currancyFormat(costBeforTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currancyFormat(taxCost)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currancyFormat(totalCost)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
};
