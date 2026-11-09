import { Link } from 'react-router'
import HeroSection from '../components/home/HeroSection'
import PromoBanner from '../components/home/PromoBanner'
import CategoryCard from '../components/products/CategoryCard'
import ProductCard from '../components/products/ProductCard'
import { categories } from '../data/categories'
import { products } from '../data/products'

function HomePage() {
  const activeProducts = products.filter((p) => p.isActive);

  // Featured: products marked as featured
  const featuredProducts = activeProducts.filter((p) => p.isFeatured).slice(0, 4);

  // Latest: sorted by date (newest first)
  const latestProducts = [...activeProducts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <>
      <HeroSection />

      {/* ===== Categories ===== */}
      <section className="section container">
        <div className="section__header">
          <h2 className="section__title">Shop by Category</h2>
          <Link to="/products" className="section__link">View all →</Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              productCount={activeProducts.filter((p) => p.category === category.name).length}
            />
          ))}
        </div>
      </section>

      {/* ===== Featured ===== */}
      <section className="section container">
        <div className="section__header">
          <h2 className="section__title">Featured Products</h2>
          <Link to="/products" className="section__link">View all →</Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== Promo ===== */}
      <PromoBanner />

      {/* ===== Latest ===== */}
      <section className="section container">
        <div className="section__header">
          <h2 className="section__title">New Arrivals</h2>
          <Link to="/products" className="section__link">View all →</Link>
        </div>
        <div className="product-grid">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;