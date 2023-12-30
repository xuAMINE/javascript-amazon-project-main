export const cart = [];

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
}