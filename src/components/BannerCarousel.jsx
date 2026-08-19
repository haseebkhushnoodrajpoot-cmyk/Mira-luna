// src/components/BannerCarousel.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import bannersData from '../data/banners.json';

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeBanners = bannersData.filter((b) => b.active === true).sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const currentBanner = activeBanners[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-lg mb-8 group">
      <Link to={currentBanner.link || '#'}>
        <div className="relative aspect-[21/9] w-full bg-black/50">
          <img
            src={currentBanner.image || 'https://picsum.photos/seed/banner/1200/400'}
            alt={currentBanner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8 sm:px-16">
            <div>
              <h2 className="text-2xl sm:text-4xl font-serif text-gold mb-2">{currentBanner.title}</h2>
              {currentBanner.subtitle && (
                <p className="text-sm sm:text-lg text-white/80">{currentBanner.subtitle}</p>
              )}
              <span className="inline-block mt-4 text-xs uppercase tracking-wider text-gold border border-gold/30 px-4 py-2 hover:bg-gold hover:text-black transition-colors">
                Shop Now
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Navigation Arrows */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-10"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-gold w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}