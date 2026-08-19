import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, MessageCircle } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import AddToCartButton from '../components/AddToCartButton'
import { COLLECTIONS, WHATSAPP_NUMBER, EXCHANGE_RATE } from '../constants'
import products from '../data/products.json'

export default function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 text-center">
        <h2 className="font-serif text-2xl text-white">Product not found</h2>
        <Link to="/shop" className="text-gold underline mt-4 inline-block">Back to Shop</Link>
      </div>
    )
  }

  const col = COLLECTIONS[product.collection]
  const related = products.filter((p) => p.collection === product.collection && p.id !== product.id).slice(0, 3)

  const originalPricePKR = Math.round(product.price * EXCHANGE_RATE).toLocaleString()
  let salePricePKR = null
  let salePercent = 0

  if (product.salePercent && product.salePercent > 0) {
    salePercent = product.salePercent
    const discountedPrice = product.price * (1 - salePercent / 100)
    salePricePKR = Math.round(discountedPrice * EXCHANGE_RATE).toLocaleString()
  }

  const [imgIndex, setImgIndex] = useState(0)
  const images = [product.image, ...related.map((r) => r.image).slice(0, 2)]

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Mira & Luna! I'm interested in ${product.name}. Is it available?`
  )}`

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-gold mb-8 transition-colors">
        <ChevronLeft size={14} /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square w-full overflow-hidden bg-white/5 rounded-lg shadow-sm group">
            <img
              src={images[imgIndex] || 'https://picsum.photos/seed/fallback/600/800'}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`border ${imgIndex === i ? 'border-gold' : 'border-transparent'} overflow-hidden w-16 h-16 hover:border-gold/50 transition-colors rounded`}
              >
                <img src={src || 'https://picsum.photos/seed/fallback/100/100'} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold">{col.name} — {col.tag}</p>
          <h1 className="font-serif text-3xl mt-2 text-white">{product.name}</h1>
          
          {/* Price with Sale */}
          <div className="mt-3">
            {salePercent > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl text-red-400 font-bold">Rs. {salePricePKR}</span>
                <span className="text-lg text-white/40 line-through">Rs. {originalPricePKR}</span>
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-{salePercent}%</span>
              </div>
            ) : (
              <p className="text-xl text-gold">Rs. {originalPricePKR}</p>
            )}
          </div>

          <p className="text-sm text-white/60 leading-relaxed mt-5">{product.desc}</p>

          {/* Stock Status */}
          <div className="mt-3">
            {(product.stock || 0) > 0 ? (
              <p className="text-sm text-green-500">
                ✅ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-sm text-red-500">❌ Out of Stock</p>
            )}
          </div>

          <div className="mt-7 space-y-2 text-sm border-t border-white/10 pt-6">
            <div className="flex justify-between">
              <span className="text-white/45">Material / Finish</span>
              <span className="font-medium text-white">{product.finish}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/45">Size</span>
              <span className="font-medium text-white">{product.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/45">Collection</span>
              <span className="font-medium text-white">{col.name}</span>
            </div>
          </div>

          <AddToCartButton product={product} className="w-full mt-6" />

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 w-full flex items-center justify-center gap-2 py-4 bg-gold text-black text-[12px] tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors rounded"
          >
            <MessageCircle size={16} /> Order On WhatsApp
          </a>

          <details className="mt-8 border-t border-white/10 pt-5">
            <summary className="text-[11px] tracking-[0.15em] uppercase cursor-pointer text-white/70 hover:text-gold transition-colors">Jewellery Care</summary>
            <p className="text-sm text-white/60 mt-3 leading-relaxed">
              Keep jewellery away from water, perfumes, lotions and harsh chemicals. Store it in a dry place when not wearing it.
            </p>
          </details>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-serif text-2xl mb-8 text-white">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}