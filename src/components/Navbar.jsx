import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar = ({ totalItems, toggleCart, isLoggedIn, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('myToken');
    localStorage.removeItem('myUser');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-[#1a1a2e] text-white px-4 h-16 flex items-center justify-between sticky top-0 z-50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),0_4px_6px_-2px_rgba(0,0,0,0.15)]">

      <button
        className="md:hidden bg-transparent border-none text-white text-2xl p-2 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        ☰
      </button>

      
      <div className="text-xl md:text-2xl font-extrabold text-[#e94560] select-none">
        Shop<span className="text-white">Wave</span>
      </div>

    
      <ul
        className={`
          list-none flex-col items-center gap-6 w-full absolute left-0 top-16 bg-[#1a1a2e] py-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] z-[49]
          md:relative md:top-auto md:left-auto md:w-auto md:flex-row md:bg-transparent md:py-0 md:shadow-none md:gap-7
          ${menuOpen ? "flex" : "hidden md:flex"}
        `}
      >
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-300 no-underline font-medium transition-colors duration-200 hover:text-[#e94560]">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="text-gray-300 no-underline font-medium transition-colors duration-200 hover:text-[#e94560]">
            Products
          </Link>
        </li>
        <li>
          <Link to="/Deals" onClick={() => setMenuOpen(false)} className="text-gray-300 no-underline font-medium transition-colors duration-200 hover:text-[#e94560]">
            Deals
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-gray-300 no-underline font-medium transition-colors duration-200 hover:text-[#e94560]">
            Contact
          </Link>
        </li>
      </ul>

      
      <div className="flex items-center gap-3">
        {isLoggedIn && (
          <div className="relative">
            <button
              className="bg-transparent border-none text-white p-1.5 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-white/10"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Profile"
            >
              <FaUserCircle size={24} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] overflow-hidden animate-dropdown-fade-in z-[100]">
                <div className="p-3">
                  <p className="font-semibold m-0">{user?.firstName} {user?.lastName}</p>
                  <p className="text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis mt-0.5 mb-0">{user?.email}</p>
                </div>
                <hr className="border-0 border-t border-gray-200 m-0" />
                <button
                  className="w-full text-left px-3 py-2 bg-transparent border-none text-gray-700 text-sm cursor-pointer transition-colors duration-200 hover:bg-gray-100 hover:text-black"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}

        <button
          className="bg-gradient-to-br from-[#e94560] to-[#f093fb] border-none text-white py-2 px-3 rounded-full flex items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
          onClick={toggleCart}
        >
          <FaShoppingCart color="white" size={20} />
          {totalItems > 0 && (
            <span className="bg-white text-[#e94560] rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;