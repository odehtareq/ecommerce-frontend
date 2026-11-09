import { Link } from 'react-router'
import './CategoryCard.css'

function CategoryCard({ category, productCount }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="category-card"
    >
      <span className="category-card__icon" aria-hidden="true">{category.icon}</span>
      <h3 className="category-card__name">{category.name}</h3>
      <p className="category-card__count">{productCount} products</p>
    </Link>
  );
}

export default CategoryCard;