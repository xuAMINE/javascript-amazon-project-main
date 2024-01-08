import { cart, removeFromCart, CalculateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from "../data/products.js";
import { currancyFormat } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../data/deliveryOptions.js";

let orderSummaryHTML = '';

cart.forEach(cartItem => {
    const productid = cartItem.productId;
    const productQuantity = cartItem.quantity;

    let matchingItem;

    products.forEach( product => {
        if (product.id === productid) {
            matchingItem = product;
        }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach( option => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    const deliveryDay = dayjs().add(deliveryOption.days, 'days');
    const dateString = deliveryDay.format('dddd, MMM DD');

    orderSummaryHTML += 
    `
        <div class="cart-item-container js-cart-container-${matchingItem.id}">
            <div class="delivery-date">
            Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingItem.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingItem.name}
                    </div>
                    <div class="product-price">
                    $${currancyFormat(matchingItem.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label${matchingItem.id}">${productQuantity}</span>
                    <input class="update-quanitity-input js-update-quanitity-input-${matchingItem.id}" data-product-id="${matchingItem.id}">
                    <span class="save-quantity-link link-primary" data-product-id="${matchingItem.id}">
                    save
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingItem.id}">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${matchingItem.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryHTMl(matchingItem, cartItem)}
                </div>
            </div>
        </div>
    `;
})


function deliveryHTMl(matchingItem, cartItem) {
    let deliveryOptionsHTML = '';

    deliveryOptions.forEach( option => {
        const deliveryDay = dayjs().add(option.days, 'days');
        const deliveryDateHTML = deliveryDay.format('dddd, MMM DD');
        const shippingPrice = option.priceCents;
        const shippingPriceHTML = shippingPrice === 0 ? 'FREE' : `${currancyFormat(option.priceCents)} -`;
        const isChecked = option.id === cartItem.deliveryOptionId ? 'checked' : '';

        deliveryOptionsHTML +=
        `
        <div class="delivery-option">
            <input type="radio" ${isChecked}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
            <div>
                <div class="delivery-option-date">
                ${deliveryDateHTML}
                </div>
                <div class="delivery-option-price">
                ${shippingPriceHTML} Shipping
                </div>
            </div>
        </div>
        `
    })

    return deliveryOptionsHTML;
}

document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;

document.querySelectorAll('.js-delete-quantity').forEach( link => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-container-${productId}`);
        container.remove(); 
        updateCartQuantity();
    })
});

document.querySelectorAll('.js-update-quantity').forEach( link => {
    link.addEventListener('click', () => {
        const { productId }= link.dataset;
        const updateLink = document.querySelector(`.js-cart-container-${productId}`);
        updateLink.classList.add('is-editing-quantity')
    })
})

function saveNewQuantity(newQuantity, productId) {
    if (newQuantity < 1 || newQuantity > 1000) {
        alert('Qunatity must be more than "1" and less than a "1000"!');
    } else {
        const saveLink = document.querySelector(`.js-cart-container-${productId}`);
        saveLink.classList.remove('is-editing-quantity');
        
        updateQuantity(productId, newQuantity);
        updateCartQuantity();
    };
};

document.querySelectorAll('.update-quanitity-input').forEach( link => {
    link.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            const {productId} = link.dataset;
            const newQuantityInput = document.querySelector(`.js-update-quanitity-input-${productId}`);
            const newQuantity = Number(newQuantityInput.value);
            saveNewQuantity(newQuantity, productId);
        }
    })  
})

document.querySelectorAll('.save-quantity-link').forEach( link => {
    link.addEventListener('click', () => {
        const {productId} = link.dataset;
        const newQuantityInput = document.querySelector(`.js-update-quanitity-input-${productId}`);
        const newQuantity = Number(newQuantityInput.value);

        saveNewQuantity(newQuantity, productId);
    })
})

function updateCartQuantity () {
    CalculateCartQuantity();

    const cartQuantity = CalculateCartQuantity();

    const checkoutText = document.querySelector('.js-checkout-item-count');
    cartQuantity === 0 ? checkoutText.innerHTML = '' : cartQuantity === 1 ? 
    checkoutText.innerHTML = `1 Item` : checkoutText.innerHTML = `${cartQuantity} Items`;
};

updateCartQuantity();
