import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Mobiles', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100' },
  { name: 'Fashion', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100' },
  { name: 'Electronics', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/69cff05c0ea62244.png?q=100' },
  { name: 'Home', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/ab7e2c021d97a021.png?q=100' },
  { name: 'Appliances', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100' },
  { name: 'Travel', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b0011.png?q=100' },
  { name: 'Top Offers', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100' },
  { name: 'Beauty & Toys', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100' },
  { name: 'Two Wheelers', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/05d708653beff17a.png?q=100' },
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
            <div className="w-16 h-16 mb-2 group-hover:scale-110 transition-transform">
              <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain" />
            </div>
            <span className="text-sm font-bold text-[#212121] group-hover:text-primary transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
