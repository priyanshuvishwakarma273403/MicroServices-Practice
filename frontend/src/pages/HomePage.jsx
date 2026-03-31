import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import DealOfDay from '../components/home/DealOfDay';
import ProductCard from '../components/common/ProductCard';
import { getTopRatedProducts } from '../api/productApi';
import Spinner from '../components/common/Spinner';

const HomePage = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await getTopRatedProducts();
        setTopRated(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setTopRated([]);
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="flex flex-col">
      <HeroBanner />

      <DealOfDay deals={topRated} />

      {/* Row: Best of Electronics */}
      <div className="bg-white rounded-sm shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <h2 className="text-xl font-bold text-[#212121]">Best of Electronics</h2>
          <button className="bg-primary text-white text-xs font-bold px-6 py-2.5 rounded hover:bg-[#2061cc] transition-colors">VIEW ALL</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {loading ? [...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-sm"></div>
          )) : topRated.length > 0 ? (
            topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-500">
              No products found in the database.
            </div>
          )}
        </div>
      </div>

      {/* Top Picks Section */}
      <div className="bg-white rounded-sm shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-[#212121]">Top Rated Products</h2>
            <button className="bg-primary text-white text-xs font-bold px-6 py-2.5 rounded hover:bg-[#2061cc] transition-colors">VIEW ALL</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {!loading && topRated.length > 0 ? (
              topRated.slice(0, 5).map((product) => (
               <ProductCard key={`top-${product.id}`} product={product} />
              ))
            ) : !loading && (
              <div className="col-span-full py-10 text-center text-gray-500">
                Start adding products from the admin panel to see them here.
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
