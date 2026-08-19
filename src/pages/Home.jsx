import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import GoldButton from '../components/GoldButton'
import WhatsAppBanner from '../components/WhatsAppBanner'
import Constellation from '../components/Constellation'
import BannerCarousel from '../components/BannerCarousel'
import { COLLECTIONS } from '../constants'
import products from '../data/products.json'
import settings from '../data/settings.json'

const featured = products.slice(0, 4)
const newArrivals = [products[8], products[9], products[4], products[10]]
const bestSellers = [products[1], products[5], products[3], products[11]]

export default function Home() {
  return (
    <>
      {/* BANNERS */}
      {settings.show_banners && <BannerCarousel />}

      {/* Hero Section */}
      {settings.show_hero && (
        <section className="relative px-5 sm:px-8 pt-20 pb-24 text-center overflow-hidden">
          <div
            className="absolute inset-0 -z-10 animate-fade-in"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,180,131,0.16), transparent 60%)' }}
          />
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold-dark animate-fade-in">Where Starlight Meets Moonlight</p>
          
          <h1 className="font-serif text-5xl sm:text-7xl mt-5 leading-[1.05] animate-fade-in">
            <span className="text-gold">MIRA</span>
            <span className="text-gold mx-2">&amp;</span>
            <span className="text-silver">LUNA</span>
          </h1>
          
          <h2 className="font-serif italic text-2xl sm:text-3xl mt-4 text-gold animate-fade-in">
            Celestial Inspired Jewellery
          </h2>
          
          <p className="max-w-md mx-auto mt-5 text-sm text-white/60 leading-relaxed animate-fade-in">
            Jewellery inspired by the beauty of stars and the moon, created for those who carry their own light.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-9 flex-wrap animate-fade-in">
            <Link to="/shop">
              <GoldButton>Explore Collections</GoldButton>
            </Link>
            <Link to="/shop">
              <GoldButton variant="outline">View Catalogue</GoldButton>
            </Link>
          </div>
          
          <Constellation className="w-48 h-6 mx-auto mt-14 opacity-70 animate-float" />
        </section>
      )}

      {/* Collections */}
      {settings.show_collections && (
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <p className="text-center text-3xl tracking-[0.25em] uppercase text-gold-dark mb-2">Our Collections</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {Object.entries(COLLECTIONS).map(([key, col]) => (
              <Link key={key} to={`/collections/${key}`} className="group">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5 rounded-lg shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
                  <img
                    src={`https://picsum.photos/seed/${key}col/600/800`}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="pt-5 text-center">
                  <h3 className="font-serif text-2xl text-white group-hover:text-gold-dark transition-colors">{col.name}</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gold-dark mt-1">{col.tag}</p>
                  <p className="text-sm text-white/60 mt-2">{col.line}</p>
                  <Link 
                    to={`/collections/${key}`} 
                    className="inline-block mt-4 text-[11px] tracking-[0.14em] uppercase border-b border-white/30 group-hover:border-gold group-hover:text-gold pb-0.5 transition-colors"
                  >
                    Discover {col.name}
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured */}
      {settings.show_featured && <ProductRow title="Featured Pieces" products={featured} />}
      {settings.show_new_arrivals && <ProductRow title="New Arrivals" products={newArrivals} tint />}
      {settings.show_best_sellers && <ProductRow title="Best Sellers" products={bestSellers} />}

      {/* About Preview */}
      {settings.show_about_preview && (
        <section className="bg-black/80 text-ivory py-20 px-5 sm:px-8 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-3">Our Story</p>
            <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-white">
              A little piece of the universe, created for you to wear.
            </h2>
            <p className="mt-5 text-sm text-white/60 leading-relaxed">
              Mira & Luna was born from the beauty of two celestial lights — the brilliance of a star and the quiet glow of the moon.
            </p>
            <Link to="/about">
              <GoldButton className="mt-8">Learn More</GoldButton>
            </Link>
          </div>
        </section>
      )}

      {/* Instagram + Social Links */}
      {settings.show_instagram_feed && (
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <p className="text-center text-[11px] tracking-[0.25em] uppercase text-gold-dark mb-2">@miralunajewels</p>
          <h2 className="font-serif text-3xl text-center text-white mb-10">Follow Along</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <a
                key={i}
                href="https://www.instagram.com/miralunajewels?igsh=MTZjejRqY3MzZjFzbg=="
                target="_blank"
                rel="noreferrer"
                className="block aspect-square overflow-hidden bg-white/5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={`https://picsum.photos/seed/insta${i}/400/400`}
                  alt="Instagram"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </a>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-center text-[10px] tracking-[0.2em] uppercase text-white/40 mb-5">Connect With Us</p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <a href="https://www.instagram.com/miralunajewels" target="_blank" rel="noreferrer" className="text-white/50 hover:text-[#E4405F] transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.facebook.com/share/1C6KX3LG4M/" target="_blank" rel="noreferrer" className="text-white/50 hover:text-[#1877F2] transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://wa.me/923124884822" target="_blank" rel="noreferrer" className="text-white/50 hover:text-[#25D366] transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span className="sr-only">WhatsApp</span>
              </a>
              <a href="https://www.tiktok.com/@miralunajewel" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                <span className="sr-only">TikTok</span>
              </a>
              <a href="https://snapchat.com/t/qKsU6vjU" target="_blank" rel="noreferrer" className="text-white/50 hover:text-[#FFFC00] transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.043 21.332c-1.247 0-2.445-.184-3.57-.52-.491-.146-.83-.358-.956-.546-.082-.123-.09-.262-.024-.424.09-.222.284-.399.543-.496.363-.136.842-.21 1.356-.229.573-.022.904-.058 1.08-.145.254-.129.34-.345.307-.546-.04-.237-.27-.385-.72-.481-.098-.021-.198-.043-.302-.067-1.204-.27-2.158-.734-2.842-1.378-1.005-.943-1.546-2.224-1.546-3.659 0-.518.091-1.008.269-1.452l.003-.008c.151-.383.382-.778.655-1.177l.025-.036c.39-.563.77-1.11.883-1.71.088-.469-.021-.96-.294-1.312-.527-.68-1.349-.741-1.731-.664-.237.048-.465.113-.664.169-.47.132-1.038.353-1.265.621-.29.343-.263.73-.21.923.055.196.206.466.492.653.339.222.801.376 1.342.377.674.002 1.289-.169 1.64-.623-.12-.122-.225-.252-.312-.39-.185-.295-.284-.601-.179-.835.091-.203.312-.362.584-.423.223-.05.463-.053.64-.011.569.134.744.564.808.843.08.356-.01.715-.263 1.071-.13.183-.22.331-.268.435l-.017.036c-.17.386-.312.777-.421 1.162-.165.586-.201 1.167-.108 1.721.195 1.178.974 2.088 2.15 2.521.553.203 1.063.302 1.572.302.508 0 1.018-.099 1.572-.302 1.176-.433 1.955-1.343 2.15-2.521.093-.554.058-1.135-.108-1.721-.11-.385-.251-.776-.421-1.162l-.017-.036c-.048-.104-.138-.252-.268-.435-.253-.356-.343-.715-.263-1.071.064-.279.239-.709.808-.843.177-.042.417-.039.64.011.272.061.493.22.584.423.105.234.006.54-.179.835-.087.138-.192.268-.312.39.351.454.966.623 1.64.621.541-.001 1.003-.155 1.342-.377.286-.187.437-.457.492-.653.053-.193.08-.58-.21-.923-.227-.268-.795-.489-1.265-.621-.199-.056-.427-.121-.664-.169-.382-.077-1.204-.016-1.731.664-.273.352-.382.843-.294 1.312.113.6.493 1.147.883 1.71l.025.036c.273.399.504.794.655 1.177l.003.008c.178.444.269.934.269 1.452 0 1.435-.541 2.716-1.546 3.659-.684.644-1.638 1.108-2.842 1.378-.104.024-.204.046-.302.067-.45.096-.68.244-.72.481-.033.201.053.417.307.546.176.087.507.123 1.08.145.514.019.993.093 1.356.229.259.097.453.274.543.496.066.162.058.301-.024.424-.126.188-.465.4-.956.546-1.125.336-2.323.52-3.57.52z"/></svg>
                <span className="sr-only">Snapchat</span>
              </a>
              <a href="https://www.youtube.com/channel/UCHjXQzp-pPYFjrONo8Z5fQg" target="_blank" rel="noreferrer" className="text-white/50 hover:text-[#FF0000] transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {settings.show_whatsapp_banner && <WhatsAppBanner />}
    </>
  )
}

function ProductRow({ title, products, tint }) {
  return (
    <section className={`px-5 sm:px-8 py-14 ${tint ? 'bg-white/5' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl text-center text-white mb-10">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}