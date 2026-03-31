import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Upload, IndianRupee, Tag, Plus, Trash2, CheckCircle, ChevronLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { createProduct } from '../../api/productApi';

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    image: '',
    brand: '',
    stock: '10',
    highlights: [''],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...productData.highlights];
    newHighlights[index] = value;
    setProductData({ ...productData, highlights: newHighlights });
  };

  const addHighlightField = () => {
    setProductData({ ...productData, highlights: [...productData.highlights, ''] });
  };

  const removeHighlightField = (index) => {
    const newHighlights = productData.highlights.filter((_, i) => i !== index);
    setProductData({ ...productData, highlights: newHighlights });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const price = parseFloat(productData.price);
      
      const finalData = {
        name: productData.name,
        description: productData.description || productData.highlights.join('. '),
        price: price,
        category: productData.category,
        brand: productData.brand,
        stock: parseInt(productData.stock) || 0,
        imageUrls: [productData.image],
        rating: 0,
        reviewCount: 0,
        active: true
      };

      const response = await createProduct(finalData);
      
      if (response.status === 201 || response.status === 200) {
        toast.success('Product published successfully to the catalog!');
        setLoading(false);
        navigate('/');
      }
    } catch (error) {
      console.error("Submit Error:", error);
      const errorMsg = error.response?.data?.message || 'Failed to add product. Please ensures all microservices are running.';
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-primary font-bold mb-6 hover:translate-x-[-4px] transition-transform"
      >
        <ChevronLeft size={20} className="mr-1" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        {/* Left Side: Illustration & Info */}
        <div className="bg-primary w-full md:w-[30%] p-8 text-white flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-black mb-6 leading-tight">Add New Product</h1>
            <p className="text-white/80 font-medium leading-relaxed">Expand your store's inventory with premium quality products.</p>
          </div>
          
          <div className="opacity-10 pointer-events-none flex justify-center">
             <Package size={200} />
          </div>

          <div className="border-t border-white/20 pt-6">
             <div className="flex items-center space-x-3 text-sm font-bold">
                <CheckCircle size={18} className="text-[#FFE500]" />
                <span>Verified Seller Listing</span>
             </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[70%] p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Name */}
              <div className="col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Product Full Name</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-primary font-bold text-[#212121] transition-all"
                    placeholder="e.g. Apple iPhone 15 (Blue, 128 GB)"
                    value={productData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Price Details */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Selling Price (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    name="price"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-primary font-bold text-[#212121]"
                    placeholder="69900"
                    value={productData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Original MRP (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    name="originalPrice"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-primary font-bold text-[#212121]"
                    placeholder="79900"
                    value={productData.originalPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Inventory Stock</label>
                <input
                  type="number"
                  name="stock"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-primary font-bold text-[#212121]"
                  placeholder="e.g. 100"
                  value={productData.stock}
                  onChange={handleChange}
                />
              </div>

              {/* Category & Brand */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Category</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    name="category"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-primary font-bold text-[#212121] appearance-none"
                    value={productData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="mobiles">Mobiles</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Furniture</option>
                    <option value="appliances">Appliances</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-primary font-bold text-[#212121]"
                  placeholder="e.g. Apple"
                  value={productData.brand}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Product Description</label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-primary font-medium text-[#212121] transition-all"
                  placeholder="Detailed description of the product features, specs, etc."
                  value={productData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Image URL */}
              <div className="col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Product Image (URL)</label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="image"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-primary font-bold text-[#212121]"
                    placeholder="https://example.com/image.jpg"
                    value={productData.image}
                    onChange={handleChange}
                  />
                </div>
                {productData.image && (
                  <div className="mt-4 p-2 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center">
                    <img src={productData.image} alt="Preview" className="h-32 object-contain" onError={(e) => {e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image'}} />
                  </div>
                )}
              </div>

              {/* Highlights */}
              <div className="col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500">Key Highlights</label>
                  <button 
                    type="button" 
                    onClick={addHighlightField}
                    className="text-primary text-xs font-bold flex items-center hover:underline"
                  >
                    <Plus size={14} className="mr-1" /> Add More
                  </button>
                </div>
                <div className="space-y-4">
                  {productData.highlights.map((h, i) => (
                    <div key={i} className="flex space-x-2">
                      <input
                        type="text"
                        className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-primary text-sm font-medium"
                        placeholder={`Highlight #${i+1}`}
                        value={h}
                        onChange={(e) => handleHighlightChange(i, e.target.value)}
                      />
                      {productData.highlights.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeHighlightField(i)}
                          className="bg-red-50 text-red-500 p-3 rounded-sm hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-white font-black text-sm uppercase tracking-widest rounded-sm shadow-2xl transition-all transform active:scale-95 flex items-center justify-center space-x-3 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#fb641b] hover:bg-[#e05410] shadow-orange-500/20'}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Plus size={20} />
                  <span>Publish Product</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
