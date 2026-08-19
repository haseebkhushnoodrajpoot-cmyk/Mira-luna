import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../constants'

export default function WhatsAppBanner() {
  return (
    <section className="bg-gold/15 py-16 px-5 sm:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <MessageCircle size={26} className="mx-auto text-gold-dark" strokeWidth={1.3} />
        <h2 className="font-serif text-3xl mt-4">Have A Question?</h2>
        <p className="text-sm text-ink/60 mt-3">Message us on WhatsApp — we typically reply within the hour.</p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-7 px-7 py-3 bg-ink text-ivory text-[11px] tracking-[0.18em] uppercase hover:bg-gold-dark hover:text-ink transition-colors shadow-sm hover:shadow-md"
        >
          <MessageCircle size={14} /> Chat On WhatsApp
        </a>
      </div>
    </section>
  )
}