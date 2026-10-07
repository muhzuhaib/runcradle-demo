import { checkoutTotal } from "../../src/cart.js";

const basket = [{ price: 20, quantity: 1 }, { price: 9, quantity: 3 }];

export default [
  ["full price checkout", () => [checkoutTotal(basket, { shipping: 3, discount: 0 }), 50]],
  ["discount covers shipping too", () => [checkoutTotal(basket, { shipping: 3, discount: 0.15 }), 42.5]],
];
