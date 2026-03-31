import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // Handling both mock data fields and backend fields
  const { 
    id, 
    name, 
    price, 
    originalPrice, 
    discount, 
    rating, 
    ratingCount, 
    reviewCount, 
    image, 
    imageUrls 
  } = product;
  
  const displayImage = image || (imageUrls && imageUrls.length > 0 ? imageUrls[0] : null);
  const displayRatingCount = ratingCount || reviewCount || 0;
  
  // Calculate discount and originalPrice if not present (only for backward compatibility with mock)
  const finalPrice = price || 0;
  const finalOriginalPrice = originalPrice || (finalPrice * 1.25); // Assume 25% off if not provided
  const finalDiscount = discount || 20;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(finalPrice);

  const formattedOriginalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(finalOriginalPrice);

  return (
    <div className="group bg-white rounded-sm overflow-hidden flex flex-col p-4 transition-all duration-200 hover:shadow-card-hover border border-transparent hover:border-gray-50 h-full">
      <Link to={`/products/${id}`} className="relative h-48 mb-4 block">
        <img 
          src={displayImage || 'https://via.placeholder.com/200x200?text=No+Image'} 
          alt={name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://img.freepik.com/premium-vector/online-shopping-logo-concept-isolated-white-background_142981-1250.jpg';
          }}
        />
        <button className="absolute top-0 right-0 p-1.5 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </Link>
      
      <div className="flex flex-col flex-grow">
        <Link to={`/products/${id}`} className="mb-2">
          <h3 className="text-sm font-medium text-[#212121] line-clamp-2 leading-5 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="mb-2">
          <RatingStars rating={rating} count={displayRatingCount} />
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg font-bold text-[#212121]">{formattedPrice}</span>
          <span className="text-xs text-[#878787] line-through">{formattedOriginalPrice}</span>
          <span className="text-xs font-semibold text-[#388e3c]">{finalDiscount}% off</span>
        </div>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="w-full mt-auto bg-primary text-white text-sm font-bold py-2 px-4 rounded-sm hover:bg-[#2061cc] transition-colors active:scale-95 transform shadow-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
