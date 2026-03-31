import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  { id: 1, image: 'https://rukminim2.flixcart.com/flap/1680/280/image/75a1571247c09b66.jpg?q=50' },
  { id: 2, image: 'https://rukminim2.flixcart.com/flap/1680/280/image/50c517c186640c4a.jpg?q=50' },
  { id: 3, image: 'https://rukminim2.flixcart.com/flap/1680/280/image/9320e6f33d74f26b.jpg?q=50' },
  { id: 4, image: 'https://rukminim2.flixcart.com/flap/1680/280/image/8d39294d306b85c1.jpg?q=50' },
  { id: 5, image: 'https://rukminim2.flixcart.com/flap/1680/280/image/7027ae6c6b24016b.jpg?q=50' },
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
