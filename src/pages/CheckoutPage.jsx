import { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../hooks/useCart'
import { useToast } from '../hooks/useToast'
import { formatPrice, calculateShipping } from '../utils/helpers'
import { validateCheckout } from '../utils/validation'
import FormField from '../components/forms/FormField'
import EmptyState from '../components/common/EmptyState'
import '../styles/CheckoutPage.css'

const CITIES = [
  { value: '', label: 'Select your city' },
  { value: 'Amman', label: 'Amman' },
  { value: 'Irbid', label: 'Irbid' },
  { value: 'Zarqa', label: 'Zarqa' },
  { value: 'Aqaba', label: 'Aqaba' },
  { value: 'Salt', label: 'Salt' },
  { value: 'Madaba', label: 'Madaba' },
];

const PAYMENT_METHODS = [
  { value: 'cash', label: '💵 Cash on Delivery' },
  { value: 'card', label: '💳 Credit Card (test)' },
  { value: 'wallet', label: '📱 Mobile Wallet (test)' },
];

const INITIAL_VALUES = {
  fullName: '',
  phone: '',
  city: '',
  address: '',
  paymentMethod: '',
};

function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  // One handler for all fields (uses the input "name")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined }); // clear error while typing
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateCheckout(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    // Simulate sending the order
    setIsSubmitting(true);
    setTimeout(() => {
      const newOrderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderNumber(newOrderNumber);
      clearCart();
      setIsSubmitting(false);
      showToast('Order placed successfully!', 'success');
    }, 1200);
  };

  // ===== 1. Success screen =====
  if (orderNumber) {
    return (
      <div className="container">
        <div className="card order-success">
          <div className="order-success__icon" aria-hidden="true">✓</div>
          <h1>Thank you for your order!</h1>
          <p>Your order has been placed successfully.</p>
          <p className="order-success__number">Order #{orderNumber}</p>
          <p>We will contact you on <strong>{values.phone}</strong> to confirm delivery.</p>
          <div>
            <Link to="/products" className="btn btn--primary">Continue Shopping</Link>
            <Link to="/" className="btn btn--secondary">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // ===== 2. Empty cart =====
  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h1>Checkout</h1>
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          message="Add some products to your cart before checking out."
        >
          <Link to="/products" className="btn btn--primary">Browse Products</Link>
        </EmptyState>
      </div>
    );
  }

  // ===== 3. Checkout form =====
  const shipping = calculateShipping(cartTotal);
  const grandTotal = cartTotal + shipping;

  return (
    <div className="container">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="card checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Shipping Information</h2>

          <div className="form-row">
            <FormField
              label="Full Name"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              error={errors.fullName}
              autoComplete="name"
            />
            <FormField
              label="Phone"
              id="phone"
              name="phone"
              type="tel"
              placeholder="0791234567"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
              autoComplete="tel"
            />
          </div>

          <FormField
            label="City"
            id="city"
            name="city"
            options={CITIES}
            value={values.city}
            onChange={handleChange}
            error={errors.city}
          />

          <FormField
            label="Address"
            id="address"
            name="address"
            placeholder="Street, building number, floor..."
            value={values.address}
            onChange={handleChange}
            error={errors.address}
            autoComplete="street-address"
          />

          <fieldset className="payment-options">
            <legend>Payment Method</legend>
            {PAYMENT_METHODS.map((method) => (
              <label key={method.value} className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={values.paymentMethod === method.value}
                  onChange={handleChange}
                />
                {method.label}
              </label>
            ))}
            {errors.paymentMethod && (
              <p className="field__error">⚠ {errors.paymentMethod}</p>
            )}
          </fieldset>

          <button
            type="submit"
            className={`btn btn--primary btn--full ${isSubmitting ? 'btn--loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Placing order...' : `Place Order • ${formatPrice(grandTotal)}`}
          </button>
        </form>

        <aside className="card checkout-summary" aria-label="Order summary">
          <h2>Order Summary</h2>
          <ul className="summary-items">
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
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
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;