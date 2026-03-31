import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram, Twitter, Facebook, Youtube, Store } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#172337] text-[#878787] pt-12 pb-6 mt-12 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Column 1 */}
          <div className="text-xs">
            <h4 className="text-[#878787] font-normal mb-4 uppercase tracking-wider">About</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:underline text-white font-medium">Contact Us</Link></li>
              <li><Link to="/about" className="hover:underline text-white font-medium">About Us</Link></li>
              <li><Link to="/careers" className="hover:underline text-white font-medium">Careers</Link></li>
              <li><Link to="/stories" className="hover:underline text-white font-medium">ShopKart Stories</Link></li>
              <li><Link to="/press" className="hover:underline text-white font-medium">Press</Link></li>
              <li><Link to="/wholesale" className="hover:underline text-white font-medium">Wholesale</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="text-xs">
            <h4 className="text-[#878787] font-normal mb-4 uppercase tracking-wider">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/payments" className="hover:underline text-white font-medium">Payments</Link></li>
              <li><Link to="/shipping" className="hover:underline text-white font-medium">Shipping</Link></li>
              <li><Link to="/cancellation" className="hover:underline text-white font-medium">Cancellation & Returns</Link></li>
              <li><Link to="/faq" className="hover:underline text-white font-medium">FAQ</Link></li>
              <li><Link to="/report-infringement" className="hover:underline text-white font-medium">Report Infringement</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="text-xs">
            <h4 className="text-[#878787] font-normal mb-4 uppercase tracking-wider">Policy</h4>
            <ul className="space-y-2">
              <li><Link to="/return-policy" className="hover:underline text-white font-medium">Return Policy</Link></li>
              <li><Link to="/terms" className="hover:underline text-white font-medium">Terms Of Use</Link></li>
              <li><Link to="/security" className="hover:underline text-white font-medium">Security</Link></li>
              <li><Link to="/privacy" className="hover:underline text-white font-medium">Privacy</Link></li>
              <li><Link to="/sitemap" className="hover:underline text-white font-medium">Sitemap</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="text-xs lg:border-r border-gray-600 pr-4">
            <h4 className="text-[#878787] font-normal mb-4 uppercase tracking-wider">Social</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline text-white font-medium flex items-center"><Facebook size={12} className="mr-2"/> Facebook</a></li>
              <li><a href="#" className="hover:underline text-white font-medium flex items-center"><Twitter size={12} className="mr-2"/> Twitter</a></li>
              <li><a href="#" className="hover:underline text-white font-medium flex items-center"><Youtube size={12} className="mr-2"/> YouTube</a></li>
            </ul>
          </div>

          {/* Column 5: Mail Us */}
          <div className="text-xs col-span-2 lg:col-span-1 px-4 lg:border-l border-gray-600">
            <h4 className="text-[#878787] font-normal mb-4 uppercase tracking-wider">Mail Us:</h4>
            <p className="text-white font-medium leading-relaxed">
              ShopKart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
          </div>

          {/* Column 6: Registered Office Address */}
          <div className="text-xs col-span-2 lg:col-span-1">
            <h4 className="text-[#878787] font-normal mb-4 uppercase tracking-wider">Office Address:</h4>
            <p className="text-white font-medium leading-relaxed">
              ShopKart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India<br />
              CIN : U51109KA2012PTC066107<br />
              Telephone: 044-45614700
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white">
          <div className="flex flex-wrap items-center justify-center space-x-6 mb-4 md:mb-0">
            <Link to="/seller" className="flex items-center space-x-2 text-primary font-bold hover:scale-105 transition-transform"><Store size={14} className="text-[#FFE500]" /> <span>Become a Seller</span></Link>
            <Link to="/advertise" className="flex items-center space-x-2"><Twitter size={14} className="text-[#FFE500]" /> <span>Advertise</span></Link>
            <Link to="/gift-cards" className="flex items-center space-x-2"><Mail size={14} className="text-[#FFE500]" /> <span>Gift Cards</span></Link>
            <Link to="/help-center" className="flex items-center space-x-2"><Phone size={14} className="text-[#FFE500]" /> <span>Help Center</span></Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span>© 2026 ShopKart.com</span>
            <img src="https://static-assets-web.flixcart.com/batman-returns/static/content/imgs/payment-method-c454fb.svg" alt="Payment Gateways" className="h-4 hidden md:block" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
