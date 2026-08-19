import { MessageCircle, ChevronRight } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../constants'

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 animate-fade-in">
      <p className="text-center text-[11px] tracking-[0.25em] uppercase text-gold-dark">Get In Touch</p>
      <h1 className="font-serif text-4xl text-center mt-3 mb-12">Contact Us</h1>

      <div className="space-y-5">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between border-b border-ink/10 pb-4 group transition-colors hover:border-gold/30"
        >
          <div className="flex items-center gap-4">
            <span className="text-gold"><MessageCircle size={18} /></span>
            <div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-ink/45">WhatsApp Business</p>
              <p className="text-sm mt-0.5">0312 4884822 · @miralunajewels</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-ink/30 group-hover:text-gold group-hover:translate-x-1 transition-all" />
        </a>

        <p className="text-center text-sm text-ink/50 mt-8">
          We typically reply within the hour.
        </p>
      </div>
    </div>
  )
}