import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { isAuthenticated, isAdmin, user } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <nav className="container navbar__inner" aria-label="Main navigation">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          Tech<span>Store</span>
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`navbar__links ${isMenuOpen ? 'navbar__links--open' : ''}`}>
          <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/products" onClick={closeMenu}>Products</NavLink></li>
          <li>
            <NavLink to="/cart" onClick={closeMenu} aria-label={`Cart, ${cartCount} items`}>
              Cart <span className="navbar__badge">{cartCount}</span>
            </NavLink>
          </li>

          {isAdmin && (
            <li><NavLink to="/admin" onClick={closeMenu}>Dashboard</NavLink></li>
          )}

          {isAuthenticated ? (
            <li>
              <NavLink to="/profile" onClick={closeMenu}>
                👤 {user.fullName.split(' ')[0]}
              </NavLink>
            </li>
          ) : (
            <li><NavLink to="/login" onClick={closeMenu}>Login</NavLink></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;