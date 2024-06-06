// utils.js
export function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export function priceRow(qty, unit) {
  return qty * unit;
}

export function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}