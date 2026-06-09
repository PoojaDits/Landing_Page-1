import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store/useAuthStore'
import { useCartStore } from '@/store/useCartStore'

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const user = useAuthStore((state) => state.user)
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const totalItems = useCartStore((state) => state.totalItems)
  const toggleCart = useCartStore((state) => state.toggleCart)

  const handleLogout = (): void => {
    clearAuth()
    window.location.href = '/login'
  }

  return (
    <nav className="bg-[#1a1a2e] text-white px-4 h-16 flex items-center justify-between sticky top-0 z-50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),0_4px_6px_-2px_rgba(0,0,0,0.15)]">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white hover:bg-white/10 hover:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className="text-2xl">☰</span>
      </Button>

      <div className="text-xl md:text-2xl font-extrabold text-[#e94560] select-none">
        Shop<span className="text-white">Wave</span>
      </div>

      <ul
        className={`
          list-none flex-col items-center gap-6 w-full absolute left-0 top-16 bg-[#1a1a2e] py-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] z-[49]
          md:relative md:top-auto md:left-auto md:w-auto md:flex-row md:bg-transparent md:py-0 md:shadow-none md:gap-7
          ${menuOpen ? 'flex' : 'hidden md:flex'}
        `}
      >
        <li>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300 no-underline font-medium transition-colors duration-200 hover:text-[#e94560]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300 no-underline font-medium transition-colors duration-200 hover:text-[#e94560]"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/deals"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300 no-underline font-medium transition-colors duration-200 hover:text-[#e94560]"
          >
            Deals
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300 no-underline font-medium transition-colors duration-200 hover:text-[#e94560]"
          >
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-3">
        {isLoggedIn && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white rounded-full hover:bg-white/10 hover:text-white"
              >
                <FaUserCircle size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 z-[100] bg-white text-black"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.name || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Button
          variant="default"
          onClick={toggleCart}
          className="bg-gradient-to-br from-[#e94560] to-[#f093fb] hover:opacity-90 rounded-full flex items-center gap-2 h-10 px-4 border-none"
        >
          <FaShoppingCart color="white" size={20} />
          {totalItems > 0 && (
            <Badge
              variant="secondary"
              className="bg-white text-[#e94560] hover:bg-white hover:text-[#e94560] rounded-full w-5 h-5 flex items-center justify-center p-0 text-[10px]"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
