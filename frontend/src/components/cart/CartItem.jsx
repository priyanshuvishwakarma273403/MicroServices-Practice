import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, name, price, originalPrice, quantity, image, seller, brand } = item;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  const formattedOriginalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(originalPrice);

  return (
    <div className="bg-white p-6 md:p-10 border-b border-gray-100 last:border-0 flex flex-col md:flex-row gap-8 lg:gap-12 relative overflow-hidden group">
      {/* Product Info */}
      <div className="flex flex-col items-center md:items-start min-w-[150px]">
        <div className="w-32 h-32 mb-6 transition-transform group-hover:scale-105 duration-300">
          <img src={image || 'https://via.placeholder.com/150'} alt={name} className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center space-x-4 border border-gray-200 rounded-sm p-1.5 shadow-sm">
          <button 
            disabled={quantity <= 1}
            onClick={() => updateQuantity(id, quantity - 1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <Minus size={14} className="text-gray-800" />
          </button>
          <span className="w-10 text-center font-bold text-sm">{quantity}</span>
          <button 
            onClick={() => updateQuantity(id, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Plus size={14} className="text-gray-800" />
          </button>
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-medium text-[#212121] leading-snug line-clamp-2 md:max-w-md group-hover:text-primary transition-colors cursor-pointer mb-2">{name}</h3>
        <p className="text-sm text-[#878787] font-bold mb-4">Seller: {seller || 'RetailNet'}</p>
        
        <div className="flex items-center space-x-3 mb-8">
           <span className="text-2xl font-bold text-[#212121]">{formattedPrice}</span>
           <span className="text-sm text-[#878787] line-through font-medium">{formattedOriginalPrice}</span>
           <span className="text-sm font-bold text-[#388e3c] tracking-tight">{Math.round(((originalPrice - price) / originalPrice) * 100)}% off</span>
        </div>

        <div className="flex items-center space-x-10 text-sm font-extrabold uppercase tracking-wider">
           <button 
             onClick={() => removeFromCart(id)}
             className="text-gray-800 hover:text-red-500 transition-colors flex items-center px-4 py-2 bg-gray-50 rounded-sm hover:shadow-md active:scale-95"
           >
              <Trash2 size={16} className="mr-2" />
              Remove
           </button>
           <button className="text-gray-800 hover:text-primary transition-colors flex items-center px-4 py-2 border border-gray-100 rounded-sm hover:shadow-md active:scale-95">Save For Later</button>
        </div>
      </div>

      <div className="md:absolute md:top-10 md:right-10 text-sm text-[#212121] font-bold">
         Delivery by Mon, Mar 31 | <span className="text-[#388e3c]">FREE Delivery</span>
      </div>
    </div>
  );
};

export default CartItem;
