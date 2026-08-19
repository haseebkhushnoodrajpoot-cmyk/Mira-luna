import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { COLLECTIONS } from '../constants'
import allProducts from '../data/products.json'

export default function Shop() {
  const { collectionId } = useParams()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(collectionId || 'all')

  useEffect(() => {
    if (collectionId) setFilter(collectionId)
    else setFilter('all')
  }, [collectionId])

  const filtered = useMemo(() => {
    let list = allProducts
    if (filter !== 'all') {
      list = list.filter((p) => p.collection === filter)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    }
    return list
  }, [filter, query])

  const collectionName = filter !== 'all' ? COLLECTIONS[filter]?.name : null
  const collectionTag = filter !== 'all' ? COLLECTIONS[filter]?.tag : null
  const collectionLine = filter !== 'all' ? COLLECTIONS[filter]?.line : null

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
      {collectionId ? (
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold-dark">{collectionTag}</p>
          <h1 className="font-serif text-4xl mt-2">{collectionName}</h1>
          <p className="text-sm text-ink/60 mt-3 max-w-md mx-auto">{collectionLine}</p>
        </div>
      ) : (
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold-dark">Full Catalogue</p>
          <h1 className="font-serif text-4xl mt-2">Shop All</h1>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex gap-2 flex-wrap justify-center">
          {['all', 'mira', 'luna', 'celestia'].map((c) => (
            <Link
              key={c}
              to={c === 'all' ? '/shop' : `/collections/${c}`}
              className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-colors ${filter === c ? 'bg-ink text-ivory border-ink' : 'border-ink/25 text-ink/70 hover:border-gold hover:text-ink'}`}
            >
              {c === 'all' ? 'All' : COLLECTIONS[c]?.name}
            </Link>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jewellery…"
            className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-ink/25 focus:border-gold outline-none placeholder:text-ink/40 transition-colors"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-ink/50 py-16">No pieces match your search.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}