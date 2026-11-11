import { Link } from 'react-router'
import { getStockStatus, formatPrice } from '../../utils/helpers'
import { useCart } from '../../hooks/useCart'
import { useToast } from '../../hooks/useToast'
import './ProductCard.css'

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const stock = getStockStatus(product.stockQuantity);
  const isOutOfStock = product.stockQuantity === 0;

  const handleAddToCart = () => {
    const added = addToCart(product, 1);
    if (added) {
      showToast(`${product.name} added to cart`, 'success');
    } else {
      showToast(`You already have the max available (${product.stockQuantity}) in your cart`, 'error');
    }
  };

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>

        <h3 className="product-card__name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="product-card__price">{formatPrice(product.price)}</p>

        <span className={`badge badge--${stock.type}`}>{stock.label}</span>

        <button
          type="button"
          className="btn btn--primary btn--full"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;