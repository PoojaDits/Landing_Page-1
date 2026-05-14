import { useState } from "react";
import { Link } from "react-router-dom";

import { FaShoppingCart, FaUserCircle } from "react-icons/fa"



const Navbar = ({ totalItems, toggleCart, isLoggedIn, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('myToken');
    localStorage.removeItem('myUser');
    window.location.href = '/login';
  };

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
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          {isLoggedIn && (
            <div className="profile-container">
              <button 
                className="profile-btn" 
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Profile"
              >
                <FaUserCircle size={24} />
              </button>
              
              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <p className="profile-name">{user?.firstName} {user?.lastName}</p>
                    <p className="profile-email">{user?.email}</p>
                  </div>
                  <hr />
                  <button className="dropdown-logout-btn" onClick={handleLogout}>
                    Signout
                  </button>
                </div>
              )}
            </div>
          )}
          <button className="cart-btn" onClick={toggleCart}>
          <FaShoppingCart color="white" size={24} />
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