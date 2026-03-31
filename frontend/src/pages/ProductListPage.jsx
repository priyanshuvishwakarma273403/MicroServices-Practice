import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import Pagination from '../components/common/Pagination';
import { Filter, ChevronDown, CheckSquare, Square } from 'lucide-react';
import { getAllProducts, searchProducts, getProductsByCategory } from '../api/productApi';

const ProductListPage = () => {
  const [params] = useSearchParams();
  const category = params.get('category');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('relevance');

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;
        const searchQuery = params.get('q');

        if (searchQuery) {
          response = await searchProducts(searchQuery, currentPage - 1, 12);
          setProducts(response.data.content || response.data || []);
        } else if (category) {
          response = await getProductsByCategory(category, currentPage - 1, 12);
          setProducts(response.data.content || response.data || []);
        } else {
          response = await getAllProducts({ page: currentPage - 1, size: 12 });
          setProducts(response.data.content || response.data || []);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, sort, currentPage, params]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Left Sidebar Filters */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="bg-white rounded-sm shadow-sm p-4 sticky top-24 max-h-[calc(100vh-100px)] overflow-y-auto no-scrollbar">
          <h2 className="text-xl font-bold text-[#212121] mb-6 border-b border-gray-100 pb-2">Filters</h2>
          
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#212121] mb-4">Category</h3>
            <p className="text-sm text-primary font-medium">{category || 'All Categories'}</p>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#212121] mb-4">Price</h3>
            <input 
              type="range" 
              min="0" 
              max="100000" 
              step="1000"
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs font-bold px-2 py-1.5 border border-gray-200 rounded w-20 text-center">₹0</span>
              <span className="text-xs text-gray-400">to</span>
              <span className="text-xs font-bold px-2 py-1.5 border border-gray-200 rounded w-28 text-center">₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Brand Checklist */}
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#212121] mb-4">Brand</h3>
            <div className="space-y-3">
              {['Samsung', 'Apple', 'Sony', 'Realme', 'Xiaomi'].map((brand) => (
                <label key={brand} className="flex items-center space-x-2 cursor-pointer group">
                  <div 
                    onClick={() => toggleBrand(brand)}
                    className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center transition-colors group-hover:border-primary"
                  >
                    {selectedBrands.includes(brand) && <div className="w-2.5 h-2.5 bg-primary rounded-sm shadow-sm" />}
                  </div>
                  <span className="text-sm text-[#212121] select-none">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Customer Ratings */}
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#212121] mb-4">Customer Ratings</h3>
            <div className="space-y-3">
              {[4, 3, 2].map((star) => (
                <label key={star} className="flex items-center space-x-2 cursor-pointer transition-colors hover:text-primary">
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                  <span className="text-sm text-[#212121]">{star}★ & above</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-primary text-white font-bold py-2 rounded shadow-md mt-4 hover:shadow-lg transition-shadow">
            APPLY FILTERS
          </button>
        </div>
      </aside>

      {/* Main Grid Area */}
      <div className="flex-grow">
        <div className="bg-white rounded-sm shadow-sm mb-4">
          <div className="p-4 border-b border-gray-100">
            <nav className="text-[10px] text-[#878787] flex items-center mb-2">
              <span>Home</span>
              <span className="mx-1">/</span>
              <span>Products</span>
              {category && (
                <>
                  <span className="mx-1">/</span>
                  <span className="text-[#212121] font-bold">{category}</span>
                </>
              )}
            </nav>
            <h1 className="text-lg font-bold text-[#212121]">
                {category || 'All Products'} <span className="text-sm font-normal text-muted ml-2">(Showing 1–12 of 1500 products)</span>
            </h1>
          </div>

          {/* Sort bar */}
          <div className="flex items-center space-x-8 px-4 py-3 text-sm font-medium border-b border-gray-50 overflow-x-auto no-scrollbar whitespace-nowrap">
             <span className="text-[#212121] font-bold">Sort By</span>
             {['Relevance', 'Popularity', 'Price: Low to High', 'Price: High to Low', 'Newest First'].map((s) => (
               <button 
                 key={s} 
                 onClick={() => setSort(s.toLowerCase().replace(/[: ]/g, '-'))}
                 className={`transition-colors h-full py-1 border-b-2 ${sort === s.toLowerCase().replace(/[: ]/g, '-') ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-primary'}`}
               >
                 {s}
               </button>
             ))}
          </div>

          {/* Product Grid */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[500px]">
            {loading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-sm"></div>
              ))
            ) : products.length > 0 ? (
              products.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full py-20 text-center">
                 <p className="text-[#212121] font-bold">No products found match your query.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="p-6 flex justify-center border-t border-gray-50">
             <Pagination 
               totalPages={10} 
               currentPage={currentPage} 
               onPageChange={(page) => setCurrentPage(page)} 
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
