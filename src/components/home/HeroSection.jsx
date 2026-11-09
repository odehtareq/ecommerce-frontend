import { Link } from 'react-router'
import SearchBar from '../common/SearchBar'
import './HeroSection.css'

function HeroSection() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <h1 className="hero__title">
          Upgrade Your Tech, <span>Upgrade Your Life</span>
        </h1>
        <p className="hero__text">
          Discover the latest laptops, phones, audio gear and accessories at the best prices in Jordan.
        </p>

        <SearchBar />

        <Link to="/products" className="btn btn--secondary hero__cta">
          Shop Now →
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;