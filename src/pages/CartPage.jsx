import { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../hooks/useCart'
import { useToast } from '../hooks/useToast'
import { formatPrice, calculateShipping, FREE_SHIPPING_LIMIT } from '../utils/helpers'
import CartItem from '../components/cart/CartItem'
import EmptyState from '../components/common/EmptyState'
import ConfirmDialog from '../components/common/ConfirmDialog'
import '../styles/CartPage.css'

function CartPage() {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart();
  const { showToast } = useToast();
  const [itemToRemove, setItemToRemove] = useState(null);

  const confirmRemove = () => {
    removeFromCart(itemToRemove.id);
    showToast(`${itemToRemove.name} removed from cart`, 'info');
    setItemToRemove(null);
  };

  // ===== Empty cart =====
  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h1>Shopping Cart</h1>
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          message="Looks like you haven't added anything yet. Start shopping now!"
        >
          <Link to="/products" className="btn btn--primary">Browse Products</Link>
        </EmptyState>
      </div>
    );
  }

  const shipping = calculateShipping(cartTotal);
  const grandTotal = cartTotal + shipping;

  return (
    <div className="container">
      <h1>Shopping Cart ({cartCount} items)</h1>

      <div className="cart-layout">
        <ul className="cart-list">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={updateQuantity}
              onRemove={setItemToRemove}
            />
          ))}
        </ul>

        <aside className="card cart-summary" aria-label="Order summary">
          <h2 className="cart-summary__title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
          </div>
          <div className="summary-row summary-row--total">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>

          {shipping > 0 && (
            <p className="cart-summary__note">
              Add {formatPrice(FREE_SHIPPING_LIMIT - cartTotal)} more for free shipping 🚚
            </p>
          )}

          <Link to="/checkout" className="btn btn--primary btn--full">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="btn btn--secondary btn--full">
            Continue Shopping
          </Link>
        </aside>
      </div>

      <ConfirmDialog
        isOpen={itemToRemove !== null}
        title="Remove item?"
        message={`Are you sure you want to remove "${itemToRemove?.name}" from your cart?`}
        confirmText="Remove"
        onConfirm={confirmRemove}
        onCancel={() => setItemToRemove(null)}
      />
    </div>
  );
}

export default CartPage;