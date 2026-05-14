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
      <nav className="bg-[#1a1a2e] text-white px-4 h-16 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <button
          className="md:hidden text-white text-2xl p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>

        <div className="text-xl md:text-2xl font-extrabold text-[#e94560]">
          Shop<span className="text-white">Wave</span>
        </div>

        <ul className={`${menuOpen ? 'flex' : 'hidden md:flex'} ${menuOpen ? 'flex-col items-center w-full absolute left-0 top-16 bg-[#1a1a2e] py-4 md:static md:w-auto md:flex-row md:items-center' : 'gap-7 list-none'} md:gap-7 list-none`}> 
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#e94560] transition-colors">
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#e94560] transition-colors">
              Products
            </Link>
          </li>

          <li>
            <Link to="/Deals" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#e94560] transition-colors">
              Deals
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#e94560] transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <div className="relative">
              <button
                className="p-1.5 rounded-full hover:bg-white/10"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Profile"
              >
                <FaUserCircle size={24} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                  <div className="p-3">
                    <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                  </div>
                  <hr />
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-100" onClick={handleLogout}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          <button className="bg-gradient-to-br from-[#e94560] to-[#f093fb] border-none text-white px-3 py-2 rounded-full flex items-center gap-2" onClick={toggleCart}>
            <FaShoppingCart color="white" size={20} />
            {totalItems > 0 && (
              <span className="bg-white text-[#e94560] rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center">{totalItems}</span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;