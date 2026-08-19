import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 text-center">
        <Heart size={64} className="text-gold mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-white mb-2">Your Wishlist is Empty</h1>
        <p className="text-white/60 mb-8">Save your favourite pieces and come back to them later.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black hover:bg-gold-dark transition-colors uppercase text-sm tracking-wider rounded">
          <ShoppingBag size={16} /> Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <h1 className="font-serif text-4xl text-gold mb-2">Your Wishlist</h1>
      <p className="text-white/60 text-sm mb-8">{wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const pricePKR = Math.round(product.price * 280).toLocaleString();
          let salePricePKR = null;
          let salePercent = 0;
          if (product.salePercent && product.salePercent > 0) {
            salePercent = product.salePercent;
            const discountedPrice = product.price * (1 - salePercent / 100);
            salePricePKR = Math.round(discountedPrice * 280).toLocaleString();
          }

          return (
            <div key={product.id} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden group">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square w-full overflow-hidden bg-black/50">
                  <img src={product.image || 'https://picsum.photos/seed/fallback/600/800'} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>
              <div className="p-3">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-white font-medium text-sm hover:text-gold transition-colors">{product.name}</h3>
                </Link>
                <div className="mt-1 flex items-center gap-2">
                  {salePercent > 0 ? (
                    <>
                      <span className="text-sm text-red-400 font-bold">Rs. {salePricePKR}</span>
                      <span className="text-xs text-white/40 line-through">Rs. {pricePKR}</span>
                    </>
                  ) : (
                    <span className="text-sm text-white">Rs. {pricePKR}</span>
                  )}
                </div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => handleAddToCart(product)} className="flex-1 py-1.5 bg-gold text-black text-xs uppercase tracking-wider hover:bg-gold-dark transition-colors rounded">
                    Add to Cart
                  </button>
                  <button onClick={() => removeFromWishlist(product.id)} className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors rounded">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}