import { Link } from 'react-router-dom'
import { ChevronRight, Heart } from 'lucide-react'
import { COLLECTIONS, EXCHANGE_RATE } from '../constants'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const col = COLLECTIONS[product.collection]
  const inWishlist = isInWishlist(product.id)

  const originalPricePKR = Math.round(product.price * EXCHANGE_RATE).toLocaleString()
  let salePricePKR = null
  let salePercent = 0

  if (product.salePercent && product.salePercent > 0) {
    salePercent = product.salePercent
    const discountedPrice = product.price * (1 - salePercent / 100)
    salePricePKR = Math.round(discountedPrice * EXCHANGE_RATE).toLocaleString()
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/5 rounded-lg shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
        <img src={product.image || 'https://picsum.photos/seed/fallback/600/800'} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        
        {salePercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            {salePercent}% OFF
          </div>
        )}

        {(product.stock || 0) <= 0 && (
          <div className="absolute top-3 right-3 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            Out of Stock
          </div>
        )}

        <button onClick={handleWishlistToggle} className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
          <Heart size={18} className={inWishlist ? 'fill-red-400 text-red-400' : 'text-white/70'} />
        </button>

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 bg-black/80 backdrop-blur-sm px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase text-gold shadow-md rounded">
            View <ChevronRight size={12} />
          </span>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold-dark">{col.name}</p>
        <h3 className="mt-1 font-serif text-lg text-white group-hover:text-gold-dark transition-colors">{product.name}</h3>
        <p className="mt-1 text-sm text-white/60">{product.desc.slice(0, 58)}…</p>
        <div className="mt-2 flex items-center gap-3">
          {salePercent > 0 ? (
            <>
              <span className="text-sm text-red-400 font-bold">Rs. {salePricePKR}</span>
              <span className="text-xs text-white/40 line-through">Rs. {originalPricePKR}</span>
            </>
          ) : (
            <span className="text-sm text-white">Rs. {originalPricePKR}</span>
          )}
        </div>
      </div>
    </Link>
  )
}