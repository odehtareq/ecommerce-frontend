import { useState, useEffect } from 'react'
import { CartContext } from './CartContext'

const STORAGE_KEY = 'techstore-cart';

// Read the saved cart from Local Storage (safely)
function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function CartProvider({ children }) {
  // 1. Load the cart from Local Storage once, when the app starts
  const [cartItems, setCartItems] = useState(loadCart);

  // 2. Save the cart to Local Storage every time it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // ===== Actions =====
  const addToCart = (product, quantity = 1) => {
    const existing = cartItems.find((item) => item.id === product.id);
    const currentQty = existing ? existing.quantity : 0;

    // Don't allow more than the stock
    if (currentQty + quantity > product.stockQuantity) {
      return false;
    }

    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          stockQuantity: product.stockQuantity,
          quantity,
        },
      ]);
    }
    return true;
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.stockQuantity) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // ===== Derived values (calculated, NOT stored) =====
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;