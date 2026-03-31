import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/admin/AddProductPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';

function App() {
  const { fetchCartItems } = useCart();
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Top scroll on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems();
    }
  }, [isLoggedIn]);

  return (
    <>
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#212121',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
          },
          success: {
            iconTheme: {
              primary: '#26A541',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF6161',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/search" element={<ProductListPage />} />
          
          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />
          
          <Route path="/checkout" element={
            <ProtectedRoute>
              <div className="p-20 text-center font-bold bg-white rounded shadow-sm border border-gray-100 mt-12 mb-20 animate-fade-in text-gray-800 uppercase tracking-widest text-2xl drop-shadow-lg flex flex-col items-center justify-center">
                 <img src="https://static.vecteezy.com/system/resources/previews/016/519/078/original/payment-checkout-3d-render-icon-set-png.png" className="w-64 mb-10 transition-transform hover:scale-110 drop-shadow-2xl" />
                 <span>Checkout Flow Implementation In Progress</span>
              </div>
            </ProtectedRoute>
          } />

          <Route path="/orders" element={
            <ProtectedRoute>
               <div className="p-20 text-center font-bold bg-white rounded shadow-sm border border-gray-100 mt-12 mb-20 animate-fade-in text-gray-800 uppercase tracking-widest text-2xl drop-shadow-lg flex flex-col items-center justify-center">
                  <img src="https://cdni.iconscout.com/illustration/premium/thumb/order-placed-illustration-download-in-svg-png-gif-file-formats--shipping-successful-parcel-received-shopping-pack-e-commerce-illustrations-7578010.png" className="w-64 mb-10 transition-transform hover:scale-110 drop-shadow-2xl" />
                  <span>Your Orders List Implementation In Progress</span>
               </div>
            </ProtectedRoute>
          } />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/admin/add-product" element={
            <ProtectedRoute>
              <AddProductPage />
            </ProtectedRoute>
          } />
          
          {/* 404 handler */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center p-20 py-40 animate-fade-in text-center bg-white rounded shadow-sm border border-gray-100 mt-12 mb-20 group max-w-4xl mx-auto shadow-primary/10">
              <h1 className="text-9xl font-black text-primary opacity-20 mb-[-60px] select-none group-hover:opacity-40 transition-opacity">404</h1>
              <img src="https://static-assets-web.flixcart.com/batman-returns/static/content/imgs/error-500-6743b1.png" className="w-72 drop-shadow-2xl relative z-10 group-hover:-rotate-6 transition-transform duration-500" />
              <h2 className="text-2xl font-black text-[#212121] mb-4 mt-8">Page Not Found</h2>
              <p className="text-[#878787] font-medium mb-10 max-w-sm">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
              <Link to="/" className="bg-primary text-white font-extrabold py-4 px-12 rounded-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center border border-primary/10 shadow-primary/20">
                <span>Back to Home</span>
              </Link>
            </div>
          } />
        </Routes>
      </Layout>
    </>
  );
}

export default App;