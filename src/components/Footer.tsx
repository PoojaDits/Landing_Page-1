import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa'
import type { SocialLink, FooterLink } from '@/types'

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { icon: <FaGithub size={18} />, href: '#' },
    { icon: <FaTwitter size={18} />, href: '#' },
    { icon: <FaInstagram size={18} />, href: '#' },
    { icon: <FaLinkedin size={18} />, href: '#' },
  ]

  const quickLinks: FooterLink[] = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Deals', to: '/Deals' },
    { label: 'Contact', to: '/contact' },
  ]

  const categories = [
    'Electronics',
    'Footwear',
    'Accessories',
    'Kitchen',
    'Sports',
  ]

  return (
    <footer className="bg-[#0d0d1a] text-gray-400 pt-14 pb-6 px-6 mt-auto border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-white">
              Shop<span className="text-[#e94560]">Wave</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              Your one-stop destination for premium products at unbeatable
              prices. Fast delivery, easy returns.
            </p>

            <div className="flex gap-3 mt-1">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#e94560] hover:text-white hover:border-[#e94560] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-[#e94560] transition-colors duration-200 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Categories
            </h3>
            <ul className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products/${cat}`}
                    className="text-sm text-gray-500 hover:text-[#e94560] transition-colors duration-200 no-underline"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Subscribe to get the latest deals and offers directly in your
              inbox.
            </p>
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#e94560] transition-colors duration-200"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#e94560] to-[#f093fb] text-white text-sm font-semibold rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>
            © 2024{' '}
            <span className="text-[#e94560] font-semibold">ShopWave</span>. All
            rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-gray-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
