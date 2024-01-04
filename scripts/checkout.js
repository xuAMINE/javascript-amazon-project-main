import { cart, removeFromCart, CalculateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from "../data/products.js";
import { currancyFormat } from './utils/money.js';

let orderSummaryHTML = '';

cart.forEach(cartItem => {
    const productid = cartItem.productId;
    const productQuantity = cartItem.quantity;

    let matchingItem;

    products.forEach( product => {
        if (product.id === productid) {
            matchingItem = product;
        }
    })


    orderSummaryHTML += 
    `
        <div class="cart-item-container js-cart-container-${matchingItem.id}">
            <div class="delivery-date">
            Delivery date: Tuesday, June 21
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
                <input class="update-quanitity-input js-update-quanitity-input-${matchingItem.id}">
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
                <div class="delivery-option">
                <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                <div>
                    <div class="delivery-option-date">
                    Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                    FREE Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                <div>
                    <div class="delivery-option-date">
                    Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                    $4.99 - Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                <div>
                    <div class="delivery-option-date">
                    Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                    $9.99 - Shipping
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    `;
})

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
        console.log(productId);
    })
})

document.querySelectorAll('.save-quantity-link').forEach( link => {
    link.addEventListener('click', () => {
        const {productId} = link.dataset;
        const newQuantityInput = document.querySelector(`.js-update-quanitity-input-${productId}`);
        const newQuantity = Number(newQuantityInput.value);

        if (newQuantity < 1 || newQuantity > 1000) {
            alert('Qunatity must be more than "1" and less than a "1000"!');
        } else {
            const saveLink = document.querySelector(`.js-cart-container-${productId}`);
        saveLink.classList.remove('is-editing-quantity');
              
            updateQuantity(productId, newQuantity);
            updateCartQuantity();
        };
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
