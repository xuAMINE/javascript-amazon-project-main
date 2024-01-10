import { cart } from "../../data/cart";
import { products } from "../../data/products";

function calculateCartCost() {
    let matchingItem = []
    cart.forEach(item => {
        products.forEach( product => {
            if (item.productId === product.id) {
                matchingItem.push(product);
            }
        });
    });
    return matchingItem;
}

console.log('adaka');