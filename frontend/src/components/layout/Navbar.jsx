import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, User, LogOut, Package, Store, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { searchProducts } from '../../api/productApi';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        try {
          // In real implementation, this would call search API
          // const res = await searchProducts(searchQuery);
          // setSuggestions(res.data.suggestions);
          
          // Mocking suggestions
          const mockSuggestions = [
             `${searchQuery} in Electronics`,
             `${searchQuery} for Men`,
             `Latest ${searchQuery}`
          ];
          setSuggestions(mockSuggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error(error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const recent = JSON.parse(localStorage.getItem('recent_searches') || '[]');
      const newRecent = [searchQuery, ...recent.filter(s => s !== searchQuery)].slice(0, 5);
      localStorage.setItem('recent_searches', JSON.stringify(newRecent));
      
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 lg:px-12 flex items-center justify-between h-16 max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex flex-col flex-shrink-0 group">
          <span className="text-xl font-extrabold italic tracking-tight leading-none group-hover:scale-105 transition-transform">
            Shop<span className="text-[#FFE500]">Kart</span>
          </span>
          <span className="text-[10px] text-white flex items-center italic mt-0.5">
            Explore <span className="text-[#FFE500] font-bold mx-0.5">Plus</span>
            <img src="https://static-assets-web.flixcart.com/batman-returns/static/content/imgs/plus-brand-a7f45b.svg" alt="Plus" className="w-2.5 h-2.5 ml-0.5" />
          </span>
        </Link>

        {/* Search Bar */}
        <div ref={searchRef} className="flex-grow max-w-[650px] mx-4 relative">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              className="w-full bg-white text-[#212121] py-1.5 px-4 pr-10 rounded-sm focus:outline-none placeholder-gray-500 text-sm shadow-inner"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform">
              <Search size={18} strokeWidth={2.5} />
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white mt-1 rounded-sm shadow-xl text-[#212121] border border-gray-100 overflow-hidden">
              {suggestions.map((item, index) => (
                <div 
                  key={index}
                  className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer flex items-center border-b border-gray-50 last:border-0"
                  onClick={() => {
                    setSearchQuery(item);
                    navigate(`/search?q=${encodeURIComponent(item)}`);
                    setShowSuggestions(false);
                  }}
                >
                  <Search size={14} className="text-gray-400 mr-3" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6 lg:space-x-10 text-sm font-bold flex-shrink-0">
          {!isLoggedIn ? (
            <Link to="/login" className="bg-white text-primary px-8 py-1.5 rounded-sm hover:scale-105 transition-transform hidden lg:block">
              Login
            </Link>
          ) : (
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 py-4"
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-1">
                  <User size={14} className="text-white" />
                </div>
                <span>{user?.name || 'User'}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 mt-1 ${showUserDropdown ? 'rotate-180' : ''}`} />

                {/* Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white shadow-2xl rounded-sm py-1 border border-gray-100 text-[#212121] font-normal z-50">
                    <Link to="/profile" className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <User size={16} className="text-primary mr-3" />
                      My Profile
                    </Link>
                    <Link to="/admin/add-product" className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <Plus size={16} className="text-primary mr-3" />
                      Add Product
                    </Link>
                    <Link to="/orders" className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <Package size={16} className="text-primary mr-3" />
                      Orders
                    </Link>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-[#212121]"
                    >
                      <LogOut size={16} className="text-primary mr-3" />
                      Logout
                    </button>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-8 border-transparent border-b-white"></div>
                  </div>
                )}
              </button>
            </div>
          )}

          <Link to="/cart" className="flex items-center space-x-2 group h-16">
            <div className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden lg:inline underline-offset-4 group-hover:underline">Cart</span>
          </Link>

          <Link to="/seller" className="hidden xl:flex items-center space-x-2">
            <Store size={18} />
            <span>Become a Seller</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
