import { Link, useParams } from 'react-router'
import { products } from '../data/products'
import { useSimulatedFetch } from '../hooks/useSimulatedFetch'
import ProductDetails from '../components/products/ProductDetails'
import ProductCard from '../components/products/ProductCard'
import EmptyState from '../components/common/EmptyState'
import '../styles/ProductDetailsPage.css'
import '../components/products/ProductCardSkeleton.css'

function ProductDetailsPage() {
  const { id } = useParams();
  const { isLoading } = useSimulatedFetch({ delay: 500 });

  // ===== Loading =====
  if (isLoading) {
    return (
      <div className="container" aria-busy="true" aria-label="Loading product">
        <div className="details">
          <div className="skeleton skeleton--image" />
          <div className="details__info">
            <div className="skeleton skeleton--text skeleton--short" style={{ width: '30%' }} />
            <div className="skeleton skeleton--text" style={{ width: '80%', height: 32 }} />
            <div className="skeleton skeleton--price" />
            <div className="skeleton skeleton--text" style={{ width: '100%' }} />
            <div className="skeleton skeleton--text" style={{ width: '90%' }} />
            <div className="skeleton skeleton--button" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  const product = products.find((p) => p.id === Number(id) && p.isActive);

  // ===== Not found =====
  if (!product) {
    return (
      <div className="container">
        <EmptyState
          icon="❓"
          title="Product not found"
          message="The product you are looking for doesn't exist or was removed."
        >
          <Link to="/products" className="btn btn--primary">Back to Products</Link>
        </EmptyState>
      </div>
    );
  }

  const similarProducts = products
    .filter((p) => p.isActive && p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container">
      <Link to="/products" className="back-link">← Back to Products</Link>

      <ProductDetails key={product.id} product={product} />

      {similarProducts.length > 0 && (
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">Similar Products</h2>
          </div>
          <div className="product-grid">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetailsPage;