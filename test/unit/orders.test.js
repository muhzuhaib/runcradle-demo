import { lineTotal, subtotal } from "../../src/cart.js";

export default [
  ["line total multiplies price by quantity", () => [lineTotal({ price: 12.5, quantity: 2 }), 25]],
  ["subtotal adds every line", () => [subtotal([{ price: 20, quantity: 1 }, { price: 9, quantity: 3 }]), 47]],
  ["empty order costs nothing", () => [subtotal([]), 0]],
];
