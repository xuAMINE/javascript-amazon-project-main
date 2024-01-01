export let cart = JSON.parse(localStorage.getItem('cart'));

if (cart.length === 0) {
    cart = [{
        productId: "smid-algerian",
        quantity: 2
    }, {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1
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
            quantity
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