// Returns the stock status label and type for a quantity
export function getStockStatus(quantity) {
  if (quantity === 0) return { label: "Out of Stock", type: "out" };
  if (quantity <= 5) return { label: `Only ${quantity} left`, type: "low" };
  return { label: "In Stock", type: "in" };
}

// Formats a number as a price: 35 -> "$35.00"
export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}