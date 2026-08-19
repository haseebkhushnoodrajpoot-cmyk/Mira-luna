export default function GoldButton({ children, onClick, variant = 'solid', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 px-7 py-3 text-[11px] tracking-[0.18em] uppercase transition-all duration-300'
  const solid = 'bg-ink text-ivory hover:bg-gold hover:text-ink shadow-sm hover:shadow-md'
  const outline = 'border border-ink/30 text-ink hover:border-gold hover:bg-gold/10'
  const whatsapp = 'bg-gold text-ink hover:bg-gold-dark'
  const style = variant === 'outline' ? outline : variant === 'whatsapp' ? whatsapp : solid
  return (
    <button onClick={onClick} className={`${base} ${style} ${className}`} {...props}>
      {children}
    </button>
  )
}