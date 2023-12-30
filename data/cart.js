export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1
}, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 77
}];

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
    console.log(cart);
}