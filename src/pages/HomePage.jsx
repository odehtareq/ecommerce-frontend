import { Link } from 'react-router'
import HeroSection from '../components/home/HeroSection'
import CategoryCard from '../components/products/CategoryCard'
import { categories } from '../data/categories'
import { products } from '../data/products'

function HomePage() {
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
              productCount={products.filter((p) => p.category === category.name).length}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;