import { products } from '../data/products'
import ProductCard from '../components/products/ProductCard'

function ProductsPage() {
  return (
    <div className="container">
      <h1>All Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;