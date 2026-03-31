import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, count }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      <div className="flex bg-[#26A541] text-white text-[11px] font-bold px-1 py-[1.5px] rounded items-center mr-2">
        {rating} <Star size={10} className="fill-white ml-0.5" />
      </div>
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={12} className="fill-[#FACC15] text-[#FACC15]" />
        ))}
        {hasHalfStar && (
          <div className="relative">
             <Star size={12} className="text-[#FACC15]" />
             <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star size={12} className="fill-[#FACC15] text-[#FACC15]" />
             </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={12} className="text-gray-300" />
        ))}
      </div>
      {count && <span className="text-xs text-[#878787] font-medium ml-2">({count.toLocaleString()})</span>}
    </div>
  );
};

export default RatingStars;
