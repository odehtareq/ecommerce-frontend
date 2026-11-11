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

export const FREE_SHIPPING_LIMIT = 100;
export const SHIPPING_COST = 5;

// Free shipping for orders >= $100
export function calculateShipping(subtotal) {
  return subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;
}

// Badge style + icon for each order status
export function getOrderStatusBadge(status) {
  const map = {
    pending:    { type: 'low', icon: '⏳' },
    processing: { type: 'info', icon: '⚙️' },
    shipped:    { type: 'info', icon: '🚚' },
    delivered:  { type: 'in',  icon: '✓' },
    cancelled:  { type: 'out', icon: '✕' },
  };
  return map[status] || { type: 'info', icon: '•' };
}

// "2026-10-02" -> "Oct 2, 2026"
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}