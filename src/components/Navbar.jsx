import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ totalItems, toggleCart }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>

        <div className="navbar-logo">
          Shop<span>Wave</span>
        </div>

        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
          </li>

          <li>
            <Link to="/Deals" onClick={() => setMenuOpen(false)}>
              Deals
            </Link>
          </li>

          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </li>
        </ul>

        <div className="navbar-actions">
          <Link to="/login" className="login-nav-btn" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <button className="cart-btn" onClick={toggleCart}>
            🛒 Cart
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;