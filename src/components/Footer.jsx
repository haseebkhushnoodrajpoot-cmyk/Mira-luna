import { Link } from 'react-router-dom'
import { Instagram, Facebook, MessageCircle, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream mt-4">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid sm:grid-cols-4 gap-10">
        <div>
          <p className="font-serif text-xl">MIRA &amp; LUNA</p>
          <p className="text-sm text-ink/55 mt-3 leading-relaxed">
            Where starlight meets moonlight. Celestial inspired jewellery for those who carry their own light.
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold-dark mb-3">Shop</p>
          <div className="flex flex-col gap-2 text-sm text-ink/65">
            <Link to="/collections/mira" className="hover:text-ink transition-colors">Mira — Gold Collection</Link>
            <Link to="/collections/luna" className="hover:text-ink transition-colors">Luna — Silver Collection</Link>
            <Link to="/collections/celestia" className="hover:text-ink transition-colors">Celestia — Zodiac Collection</Link>
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold-dark mb-3">Support</p>
          <div className="flex flex-col gap-2 text-sm text-ink/65">
            <Link to="/faq" className="hover:text-ink transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-ink transition-colors">Contact Us</Link>
            <a href={`https://wa.me/923124884822`} target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">
              Order on WhatsApp
            </a>
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold-dark mb-3">Follow Us</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/miralunajewels" target="_blank" rel="noreferrer" className="text-ink/60 hover:text-[#E4405F] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/share/1C6KX3LG4M/" target="_blank" rel="noreferrer" className="text-ink/60 hover:text-[#1877F2] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://wa.me/923124884822" target="_blank" rel="noreferrer" className="text-ink/60 hover:text-[#25D366] transition-colors">
              <MessageCircle size={20} />
            </a>
            <a href="https://twitter.com/miralunajewels" target="_blank" rel="noreferrer" className="text-ink/60 hover:text-[#1DA1F2] transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-ink/10 py-5 text-center text-[11px] tracking-[0.1em] text-ink/40">
        © {new Date().getFullYear()} MIRA &amp; LUNA. All rights reserved.
      </div>
    </footer>
  )
}