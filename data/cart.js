export let cart = JSON.parse(localStorage.getItem('cart'));;

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
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
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
};