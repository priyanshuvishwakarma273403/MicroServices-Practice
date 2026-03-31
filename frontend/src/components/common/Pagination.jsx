import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center space-x-2 select-none">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-2 text-primary font-bold uppercase text-xs flex items-center disabled:opacity-30 hover:bg-gray-50 rounded transition-colors"
      >
        <ChevronLeft size={16} className="mr-1" />
        Previous
      </button>

      <div className="flex space-x-1">
        {pages.map((p) => (
          <button 
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${currentPage === p ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-[#212121] hover:bg-gray-100'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-2 text-primary font-bold uppercase text-xs flex items-center disabled:opacity-30 hover:bg-gray-50 rounded transition-colors"
      >
        Next
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default Pagination;
