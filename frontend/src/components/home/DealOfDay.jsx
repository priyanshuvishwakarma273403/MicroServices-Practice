import React, { useState, useEffect } from 'react';
import ProductCard from '../common/ProductCard';
import { Timer, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DealOfDay = ({ deals = [] }) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden mb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-wrap gap-4">
        <div className="flex items-center space-x-6">
          <h2 className="text-xl font-bold text-[#212121]">Deals of the Day</h2>
          <div className="flex items-center space-x-2 text-[#878787]">
             <Timer size={20} />
             <span className="text-lg font-medium tracking-wider">{formatTime(timeLeft)} Left</span>
          </div>
        </div>
        <Link 
          to="/products"
          className="bg-primary text-white text-xs font-bold px-6 py-2.5 rounded hover:bg-[#2061cc] transition-colors"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 py-8 bg-gray-50/50">
        {deals.map((product) => (
          <div key={product.id} className="min-w-[200px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealOfDay;
