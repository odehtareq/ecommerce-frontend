import { Link } from 'react-router'
import './PromoBanner.css'

function PromoBanner() {
  return (
    <section className="container section">
      <div className="promo">
        <div>
          <p className="promo__tag">Limited Time Offer</p>
          <h2 className="promo__title">Up to 30% off on Gaming Gear 🎮</h2>
          <p className="promo__text">Controllers, headsets, monitors and more. While stock lasts!</p>
        </div>
        <Link to="/products?category=Gaming" className="btn promo__btn">
          Shop Gaming
        </Link>
      </div>
    </section>
  );
}

export default PromoBanner;