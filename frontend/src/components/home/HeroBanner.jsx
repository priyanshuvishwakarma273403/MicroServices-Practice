import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  { id: 1, image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1680&h=280&fit=crop&q=80' },
  { id: 2, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1680&h=280&fit=crop&q=80' },
  { id: 3, image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1680&h=280&fit=crop&q=80' },
  { id: 4, image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1680&h=280&fit=crop&q=80' },
  { id: 5, image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1680&h=280&fit=crop&q=80' },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

  return (
    <div className="relative w-full h-32 md:h-52 lg:h-[280px] overflow-hidden group mb-4">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full">
            <img src={banner.image} alt="Banner" className="w-full h-full object-fill lg:object-cover" />
          </div>
        ))}
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 p-3 h-24 rounded-r-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-white"
      >
        <ChevronLeft size={24} className="text-gray-800" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 p-3 h-24 rounded-l-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-white"
      >
        <ChevronRight size={24} className="text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${current === idx ? 'bg-primary w-4' : 'bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
