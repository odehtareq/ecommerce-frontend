import './ProductCardSkeleton.css'

function ProductCardSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton--image" />
      <div className="skeleton-card__body">
        <div className="skeleton skeleton--text skeleton--short" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text skeleton--price" />
        <div className="skeleton skeleton--button" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;