export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: "smid-algerian",
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (productId) {
    let matchingItem;

    cart.forEach( item => {
        if (productId === item.productId) {
            matchingItem = item;
        };
    });

    const quanititySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quanititySelector.value);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '3'
        });
    };
    
    saveCartToLS();
    console.log(cart);
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach( cartItem => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart
    saveCartToLS();
};

export function CalculateCartQuantity() {
    let cartQuantity = 0;
        
    cart.forEach( item => {
        cartQuantity += item.quantity;
    });

    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach( item => {
        if (productId === item.productId) {
            item.quantity = newQuantity
            const newquantityText = document.querySelector(`.js-quantity-label${productId}`);
            newquantityText.innerHTML = newQuantity;
        };

        saveCartToLS();
        
    })
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    
    cart.forEach( item => {
        if (item.productId === productId) {
            matchingItem = item;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveCartToLS();
};