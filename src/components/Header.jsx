import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle, Heart, User, ShoppingBag } from 'lucide-react'
import { NAV_ITEMS, WHATSAPP_NUMBER } from '../constants'
import CartButton from './CartButton'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { currentUser } = useAuth()
  const { getWishlistCount } = useWishlist()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    if (path.startsWith('/collections/')) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-black/90 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl sm:text-3xl tracking-[0.04em] hover:opacity-80 transition-opacity">
          <span className="text-gold">MIRA</span>
          <span className="text-gold mx-1.5">&amp;</span>
          <span className="text-silver">LUNA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} to={item.id} className={`text-[11px] tracking-[0.14em] uppercase transition-colors ${isActive(item.id) ? 'text-gold' : 'text-white/70 hover:text-gold'}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/wishlist" className="relative text-white/70 hover:text-gold transition-colors">
            <Heart size={20} />
            {getWishlistCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getWishlistCount()}
              </span>
            )}
          </Link>

          <CartButton />

          {currentUser ? (
            <Link to="/account" className="text-white/70 hover:text-gold transition-colors">
              <User size={20} />
            </Link>
          ) : (
            <Link to="/login" className="text-[11px] tracking-[0.14em] uppercase text-white/70 hover:text-gold transition-colors hidden sm:inline-block">
              Login
            </Link>
          )}

          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-white/70 hover:text-gold transition-colors">
            <MessageCircle size={14} /> WhatsApp
          </a>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-4 bg-black animate-fade-in">
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} to={item.id} onClick={() => setMenuOpen(false)} className={`text-left text-sm tracking-[0.1em] uppercase ${isActive(item.id) ? 'text-gold' : 'text-white/80'}`}>
              {item.label}
            </Link>
          ))}
          <hr className="border-white/10" />
          <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="text-left text-sm tracking-[0.1em] uppercase text-white/80">Wishlist</Link>
          {currentUser ? (
            <Link to="/account" onClick={() => setMenuOpen(false)} className="text-left text-sm tracking-[0.1em] uppercase text-white/80">My Account</Link>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-left text-sm tracking-[0.1em] uppercase text-white/80">Login / Sign Up</Link>
          )}
        </div>
      )}
    </header>
  )
}