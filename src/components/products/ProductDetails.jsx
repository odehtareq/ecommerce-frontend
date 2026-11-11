import { useState } from "react";
import { getStockStatus, formatPrice } from "../../utils/helpers";
import QuantitySelector from "../cart/QuantitySelector";
import { useCart } from "../../hooks/useCart";
import { useToast } from "../../hooks/useToast";

function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const stock = getStockStatus(product.stockQuantity);
  const isOutOfStock = product.stockQuantity === 0;

  const handleAddToCart = () => {
    const added = addToCart(product, quantity);
    if (added) {
      showToast(`${quantity} × ${product.name} added to cart`, "success");
    } else {
      showToast(
        `Not enough stock. Only ${product.stockQuantity} available in total.`,
        "error",
      );
    }
  };

  return (
    <div className="details">
      <img className="details__image" src={product.image} alt={product.name} />

      <div className="details__info">
        <span className="details__category">{product.category}</span>
        <h1 className="details__name">{product.name}</h1>
        <p className="details__price">{formatPrice(product.price)}</p>
        <span className={`badge badge--${stock.type}`}>{stock.label}</span>

        <p className="details__description">{product.description}</p>

        {!isOutOfStock && (
          <div className="details__qty">
            <span className="field__label">Quantity</span>
            <QuantitySelector
              value={quantity}
              max={product.stockQuantity}
              onChange={setQuantity}
            />
          </div>
        )}

        <button
          type="button"
          className="btn btn--primary"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock
            ? "Out of Stock"
            : `Add to Cart • ${formatPrice(product.price * quantity)}`}
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
