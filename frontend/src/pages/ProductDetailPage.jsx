import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RatingStars from '../components/common/RatingStars';
import Spinner from '../components/common/Spinner';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Zap, Heart, MapPin, Star, ChevronRight, Award, ShieldCheck, RefreshCw } from 'lucide-react';
import { getProductById } from '../api/productApi';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [pinCode, setPinCode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        const data = response.data;
        
        // Ensure data has the expected structure
        const formattedProduct = {
          ...data,
          images: data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls : [
            'https://via.placeholder.com/400x400?text=No+Product+Image'
          ],
          ratingCount: data.reviewCount || 0,
          originalPrice: data.price ? data.price * 1.25 : 0, // Fallback original price
          discount: 20, // Fallback discount
          highlights: data.description ? data.description.split('.').filter(h => h.trim().length > 0) : ['No points specified.'],
          seller: {
            name: 'Priyanshu Mart',
            rating: 4.8
          }
        };
        
        setProduct(formattedProduct);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProduct(null);
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleCheckDelivery = () => {
    if (pinCode.length === 6) {
      setDeliveryResult(`Delivery by Mon, 31 Mar | ₹40`);
    }
  };

  if (loading) return <Spinner fullPage />;
  if (!product) return <div className="p-20 text-center font-bold">Product not found.</div>;

  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden p-6 lg:p-12 mb-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left Side: Images */}
        <div className="lg:w-[40%] sticky top-24 self-start">
          <div className="relative border border-gray-100 rounded-sm mb-4 h-[400px] flex items-center justify-center p-8 transition-all hover:scale-[1.02] cursor-zoom-in">
            <img 
              src={product.images[activeImage]} 
              className="max-h-full max-w-full object-contain mix-blend-multiply" 
              alt={product.name} 
            />
            <button className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors border border-gray-50">
              <Heart size={20} />
            </button>
          </div>

          <div className="flex space-x-3 justify-center mb-8">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onMouseEnter={() => setActiveImage(idx)}
                className={`w-16 h-16 border-2 rounded-sm p-1 flex items-center justify-center transition-all ${activeImage === idx ? 'border-primary' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <img src={img} className="max-h-full max-w-full object-contain mix-blend-multiply" alt="thumb" />
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
             <button 
               onClick={() => addToCart(product)}
               className="flex-1 bg-[#ff9f00] text-white py-4 px-6 rounded-sm font-bold flex items-center justify-center space-x-2 shadow hover:shadow-lg transition-all active:scale-95"
             >
               <ShoppingCart size={20} />
               <span>ADD TO CART</span>
             </button>
             <Link 
               to="/checkout"
               className="flex-1 bg-[#fb641b] text-white py-4 px-6 rounded-sm font-bold flex items-center justify-center space-x-2 shadow hover:shadow-lg transition-all active:scale-95"
             >
                <Zap size={20} className="fill-white" />
                <span>BUY NOW</span>
             </Link>
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="flex-grow">
          <nav className="text-sm text-gray-500 flex items-center mb-4 font-medium">
             <Link to="/">Home</Link>
             <ChevronRight size={14} className="mx-2" />
             <Link to="/products">Electronics</Link>
             <ChevronRight size={14} className="mx-2" />
             <span className="text-gray-400 line-clamp-1">{product.name}</span>
          </nav>

          <h1 className="text-xl font-medium text-[#212121] leading-relaxed mb-2">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex bg-[#26A541] text-white text-sm font-bold px-1.5 py-0.5 rounded items-center">
               {product.rating} <Star size={12} className="fill-white ml-0.5" />
            </div>
            <span className="text-[#878787] text-sm font-bold">{product.ratingCount} Ratings & {product.reviewsCount} Reviews</span>
            <img src="https://static-assets-web.flixcart.com/batman-returns/static/content/imgs/fa_62673a.png" className="h-[21px]" alt="Assured" />
          </div>

          <div className="mb-6">
             <p className="text-[#26A541] text-sm font-bold mb-1">Extra ₹10000 off</p>
             <div className="flex items-end space-x-3">
               <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
               <span className="text-lg text-[#878787] line-through mb-1">₹{product.originalPrice.toLocaleString()}</span>
               <span className="text-[#26A541] font-bold text-lg mb-1">{product.discount}% off</span>
             </div>
          </div>

          {/* Offers */}
          <div className="mb-8">
            <h3 className="font-bold text-[#212121] mb-3">Available offers</h3>
            <ul className="space-y-3">
              {[
                'Bank Offer 10% instant discount on Axis Bank Credit Cards, up to ₹1250',
                'Bank Offer Flat ₹100 Off on Paytm Wallet',
                'Special Price Get extra ₹10000 off (price inclusive of cashback/coupon)',
                'No Cost EMI on Bajaj Finserv EMI Card on cart value above ₹2999'
              ].map((offer, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm">
                  <span className="text-green-500 mt-1 flex-shrink-0">
                    <Zap size={14} className="fill-green-500" />
                  </span>
                  <span className="text-gray-800 leading-normal"><span className="font-bold">{offer.split(' ')[0]} {offer.split(' ')[1]}</span> {offer.split(' ').slice(2).join(' ')}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights & Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
               <h3 className="font-bold text-[#212121] mb-4">Product Highlights</h3>
               <ul className="space-y-2 list-disc list-inside text-sm text-gray-800">
                  {product.highlights.map((h, i) => <li key={i} className="leading-relaxed">{h}</li>)}
               </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#212121] mb-4 flex items-center">
                <MapPin size={18} className="text-primary mr-2" />
                Delivery
              </h3>
              <div className="flex border-b border-primary w-full max-w-[280px] mb-4">
                 <input 
                   type="text" 
                   placeholder="Enter Delivery Pincode"
                   className="flex-grow py-2 text-sm focus:outline-none"
                   maxLength={6}
                   value={pinCode}
                   onChange={(e) => setPinCode(e.target.value)}
                 />
                 <button 
                   onClick={handleCheckDelivery}
                   className="text-primary text-sm font-bold uppercase py-2 px-4 hover:scale-105 transition-transform"
                 >
                   Check
                 </button>
              </div>
              {deliveryResult && (
                <p className="text-sm font-bold text-[#212121] mb-2">{deliveryResult}</p>
              )}
              <p className="text-xs text-gray-500">Please enter pincode to check delivery availability</p>
            </div>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-6">
            <div className="flex flex-col items-center text-center">
              <RefreshCw className="text-primary mb-2" size={24} />
              <span className="text-xs font-bold text-[#212121]">7 Days Replacement</span>
            </div>
            <div className="flex flex-col items-center text-center border-l border-r border-gray-200">
              <ShieldCheck className="text-primary mb-2" size={24} />
              <span className="text-xs font-bold text-[#212121]">1 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="text-primary mb-2" size={24} />
              <span className="text-xs font-bold text-[#212121]">ShopKart Assured</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section Placeholder */}
      <section className="mt-20 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-[#212121] mb-8">Ratings & Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-4">
             <div className="flex items-center space-x-6 mb-8">
               <div className="text-5xl font-bold flex items-center">
                 4.6 <Star size={32} className="fill-[#212121] ml-2" />
               </div>
               <div>
                 <p className="text-[#878787] font-bold">12,500 Ratings &</p>
                 <p className="text-[#878787] font-bold">1,400 Reviews</p>
               </div>
             </div>
             
             {[5,4,3,2,1].map((s) => (
                <div key={s} className="flex items-center space-x-3 mb-3">
                   <span className="text-xs font-bold w-4">{s} ★</span>
                   <div className="flex-grow bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: s === 5 ? '70%' : s === 4 ? '15%' : '5%' }}></div>
                   </div>
                   <span className="text-xs text-gray-400 w-12">{s === 5 ? '8,750' : s === 4 ? '1,875' : '625'}</span>
                </div>
             ))}
           </div>
           
           <div className="lg:col-span-8 flex flex-col justify-center items-center py-12 bg-gray-50 rounded-lg">
             <p className="text-[#878787] font-medium mb-4 italic">"One of the best phones I have used in recent times. The camera is outstanding and performance is butter smooth."</p>
             <span className="text-sm font-bold text-[#212121]">- Aditi Sharma</span>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
