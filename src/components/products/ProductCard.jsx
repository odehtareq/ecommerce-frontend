import { Link } from 'react-router'
import { getStockStatus, formatPrice } from '../../utils/helpers'
import './ProductCard.css'

function ProductCard({ product }) {
  const stock = getStockStatus(product.stockQuantity);
  const isOutOfStock = product.stockQuantity === 0;

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

        <button className="btn btn--primary btn--full" disabled={isOutOfStock}>
          {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;