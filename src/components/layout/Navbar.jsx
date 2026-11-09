import { Link, NavLink } from 'react-router'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <nav className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          Tech<span>Store</span>
        </Link>

        <ul className="navbar__links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/cart">Cart</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;