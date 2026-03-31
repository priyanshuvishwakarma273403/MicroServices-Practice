import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Mobiles', icon: '📱', color: '#fff3e0' },
  { name: 'Fashion', icon: '👗', color: '#fce4ec' },
  { name: 'Electronics', icon: '💻', color: '#e3f2fd' },
  { name: 'Home', icon: '🏠', color: '#e8f5e9' },
  { name: 'Appliances', icon: '🌀', color: '#f3e5f5' },
  { name: 'Travel', icon: '✈️', color: '#e0f7fa' },
  { name: 'Top Offers', icon: '🏷️', color: '#fff8e1' },
  { name: 'Beauty', icon: '💄', color: '#fce4ec' },
  { name: 'Two Wheelers', icon: '🏍️', color: '#e8eaf6' },
];

const CategoryBar = () => {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-40 overflow-x-auto no-scrollbar">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between py-2 min-w-[max-content]">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={`/products?category=${cat.name.toLowerCase()}`}
            className="flex flex-col items-center group px-4 py-1.5 transition-all duration-200"
          >
            <div
              className="w-16 h-16 mb-2 group-hover:scale-110 transition-transform rounded-full flex items-center justify-center text-3xl shadow-sm"
              style={{ background: cat.color }}
            >
              {cat.icon}
            </div>
            <span className="text-sm font-bold text-[#212121] group-hover:text-primary transition-colors whitespace-nowrap">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
