import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CategoryBar from '../home/CategoryBar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F3F6]">
      {!isAuthPage && <Navbar />}
      {isHomePage && <CategoryBar />}
      
      <main className={`flex-grow ${!isAuthPage ? 'container mx-auto px-4 max-w-7xl pt-4 pb-12' : ''}`}>
        {children}
      </main>
      
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
