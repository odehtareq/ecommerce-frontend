import { Link } from 'react-router'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <h3 className="footer__logo">Tech<span>Store</span></h3>
          <p>Your trusted store for tech devices and accessories.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Amman, Jordan</p>
          <p>support@techstore.test</p>
        </div>
      </div>

      <p className="footer__copy">© {year} TechStore. All rights reserved.</p>
    </footer>
  );
}

export default Footer;