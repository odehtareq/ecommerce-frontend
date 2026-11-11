import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useCart } from "../../hooks/useCart";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <nav className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          Tech<span>Store</span>
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <ul
          className={`navbar__links ${isMenuOpen ? "navbar__links--open" : ""}`}
        >
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" onClick={closeMenu}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              onClick={closeMenu}
              aria-label={`Cart, ${cartCount} items`}
            >
              Cart <span className="navbar__badge">{cartCount}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={closeMenu}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
