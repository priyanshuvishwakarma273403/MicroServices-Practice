import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { items, totalAmount } = useCart();
  
  const originalTotal = items.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  const currentTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 py-40 animate-fade-in text-center bg-white rounded shadow-sm border border-gray-100 max-w-4xl mx-auto mt-12 mb-20 group">
        <div className="mb-8 w-64 h-64 flex items-center justify-center relative scale-110">
          <div className="bg-[#2874f0]/5 w-full h-full rounded-full absolute animate-pulse"></div>
          <img 
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d405a710-2137-46a4-8b6a-9188e971977e.png?q=90" 
            alt="Empty Cart" 
            className="w-48 relative drop-shadow-2xl group-hover:rotate-6 transition-transform duration-500" 
          />
        </div>
        <h2 className="text-2xl font-black text-[#212121] mb-4">Your cart is empty!</h2>
        <p className="text-[#878787] font-medium mb-12 max-w-md">Add items to it now. Explore our wide range of products across all categories and get the best deals.</p>
        <Link 
          to="/" 
          className="bg-primary text-white font-extrabold py-4 px-12 rounded-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center border border-primary/10 shadow-primary/20"
        >
          <span>Shop Now</span>
          <ArrowRight className="ml-3" size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-6 mb-12">
      {/* Items Section */}
      <div className="flex-grow flex flex-col items-stretch space-y-6 lg:w-[70%]">
        <div className="bg-white rounded-sm shadow-sm overflow-hidden flex flex-col border border-gray-100">
          <div className="p-4 md:px-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
             <h1 className="text-xl font-bold text-[#212121]">My Cart ({items.length})</h1>
             <div className="flex items-center space-x-2 text-primary text-sm font-bold border border-primary/20 bg-primary/5 px-4 py-2 rounded-sm cursor-pointer hover:bg-primary/10 transition-colors">
               <MapPin size={14} />
               <span>Check Location</span>
             </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="sticky bottom-0 bg-white p-6 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.2)] border-t border-gray-100 flex items-center justify-end">
            <Link 
              to="/checkout"
              className="bg-[#fb641b] text-white py-5 px-16 rounded-sm font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-[#e05410] transition-all hover:-translate-y-1 active:scale-95 flex items-center"
            >
              <span>Place Order</span>
              <ArrowRight className="ml-3" size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Price Summary Section */}
      <div className="lg:w-[30%] flex-shrink-0">
        <OrderSummary items={items} totalAmount={currentTotal} originalTotal={originalTotal} />
      </div>
    </div>
  );
};

// Simple icon wrapper
const MapPin = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export default CartPage;
