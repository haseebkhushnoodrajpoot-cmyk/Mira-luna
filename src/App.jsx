import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Checkout from './pages/Checkout'
import ThankYou from './pages/ThankYou'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Wishlist from './pages/Wishlist'
import Payment from './pages/Payment'
import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function App() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Helmet defaultTitle="Mira & Luna — Celestial Inspired Jewellery" titleTemplate="%s | Mira & Luna" />
          <div className="min-h-screen flex flex-col bg-black text-white">
            <Header />
            <CartDrawer />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/collections/:collectionId" element={<Shop />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<Account />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/payment" element={<Payment />} />
              </Routes>
            </main>
            <Footer />
            {showButton && (
              <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-gold text-black p-3 rounded-full shadow-lg hover:bg-gold-dark transition-colors z-50" aria-label="Back to top">
                <ArrowUp size={24} />
              </button>
            )}
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}