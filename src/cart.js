export function lineTotal(item) {
  return Math.round(item.price * item.quantity * 100) / 100;
}

export function subtotal(items) {
  return items.reduce((sum, item) => sum + lineTotal(item), 0);
}

export function checkoutTotal(items, { shipping, discount }) {
  const discounted = subtotal(items) * (1 - discount);
  return Math.round((discounted + shipping) * 100) / 100;
}
