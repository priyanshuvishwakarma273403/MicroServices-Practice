import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EmptyState = ({ 
  title = "No results found!", 
  message = "Please try again with a different keyword or filter.", 
  image = "https://static-assets-web.flixcart.com/batman-returns/static/content/imgs/error-500-6743b1.png" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-20 py-40 animate-fade-in text-center bg-white rounded shadow-sm border border-gray-100 mt-12 mb-20 group max-w-4xl mx-auto shadow-primary/10">
      <img 
        src={image} 
        alt="EmptyState" 
        className="w-72 drop-shadow-2xl relative z-10 group-hover:-translate-y-2 transition-transform duration-500" 
      />
      <h2 className="text-2xl font-black text-[#212121] mb-4 mt-8">{title}</h2>
      <p className="text-[#878787] font-medium mb-10 max-w-sm leading-relaxed">{message}</p>
      <Link 
        to="/" 
        className="bg-primary text-white font-extrabold py-4 px-12 rounded-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center border border-primary/10 shadow-primary/20"
      >
        <ArrowLeft className="mr-3" size={18} />
        <span>Continue Shopping</span>
      </Link>
    </div>
  );
};

export default EmptyState;
