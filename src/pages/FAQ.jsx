import { useState } from 'react'

const FAQS = [
  { q: 'How can I place an order?', a: 'Simply click the Order on WhatsApp button on the product you are interested in. You can also contact us directly through WhatsApp Business.' },
  { q: 'How long does delivery take?', a: '3–5 business days.' },
  { q: 'Do you offer Cash on Delivery?', a: 'Yes.' },
  { q: 'Can I return or exchange my jewellery?', a: 'No. All sales are final. We currently do not offer returns or exchanges.' },
  { q: 'What if I receive a damaged or incorrect item?', a: 'Please contact us as soon as possible with clear photos/videos of the item and packaging so we can review the issue.' },
  { q: 'How should I care for my jewellery?', a: 'Keep jewellery away from water, perfumes, lotions and harsh chemicals. Store it in a dry place when not wearing it.' },
  { q: 'Is the jewellery waterproof?', a: 'Please check the individual product description. We recommend keeping jewellery away from water and chemicals to maintain its finish.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 animate-fade-in">
      <p className="text-center text-[11px] tracking-[0.25em] uppercase text-gold-dark">Need Help?</p>
      <h1 className="font-serif text-4xl text-center mt-3 mb-12 text-white">Frequently Asked Questions</h1>
      <div className="divide-y divide-white/10 border-t border-b border-white/10">
        {FAQS.map((f, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="text-sm sm:text-[15px] text-white group-hover:text-gold-dark transition-colors">{f.q}</span>
              <span className="text-gold-dark text-lg leading-none transition-transform duration-300">
                {open === i ? '−' : '+'}
              </span>
            </button>
            {open === i && (
              <p className="text-sm text-white/60 leading-relaxed pb-5 pr-8 animate-fade-in">
                {f.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}