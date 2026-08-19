export default function Constellation({ className = '' }) {
  return (
    <svg viewBox="0 0 240 24" className={className} fill="none" aria-hidden="true">
      <line x1="4" y1="12" x2="236" y2="12" stroke="#D4B483" strokeWidth="0.6" strokeDasharray="1 7" />
      <circle cx="20" cy="12" r="2" fill="#D4B483" />
      <circle cx="120" cy="12" r="2.6" fill="#D4B483" />
      <circle cx="220" cy="12" r="2" fill="#D4B483" />
    </svg>
  )
}