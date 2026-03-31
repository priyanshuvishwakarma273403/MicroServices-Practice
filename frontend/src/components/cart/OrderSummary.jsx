import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

const OrderSummary = ({ items, totalAmount, originalTotal = 0 }) => {
  const discount = originalTotal - totalAmount;
  const deliveryCharge = totalAmount > 500 ? 0 : 40;
  const finalAmount = totalAmount + deliveryCharge;

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="bg-white rounded-sm shadow-sm flex flex-col sticky top-24">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
         <h2 className="text-sm font-bold uppercase tracking-wider text-[#878787]">Price Details</h2>
         <Info size={14} className="text-[#878787]" />
      </div>

      <div className="p-6 space-y-6 flex flex-col border-b border-gray-100 border-dashed mb-4">
        <div className="flex justify-between items-center text-sm font-medium">
           <span className="text-[#212121]">Price ({items.length} items)</span>
           <span className="text-[#212121]">{formatPrice(originalTotal)}</span>
        </div>
        <div className="flex justify-between items-center text-sm font-medium">
           <span className="text-[#212121]">Discount</span>
           <span className="text-[#388e3c] font-bold">-{formatPrice(discount)}</span>
        </div>
        <div className="flex justify-between items-center text-sm font-medium">
           <span className="text-[#212121]">Buy More & Save More</span>
           <span className="text-[#388e3c] font-bold">-₹1,000</span>
        </div>
        <div className="flex justify-between items-center text-sm font-medium">
           <span className="text-[#212121]">Delivery Charges</span>
           <span className={`${deliveryCharge === 0 ? 'text-[#388e3c]' : 'text-[#212121]'} font-bold`}>
             {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
           </span>
        </div>
      </div>

      <div className="px-6 py-6 flex flex-col space-y-4 mb-4">
        <div className="flex justify-between items-center text-lg font-bold">
           <span className="text-[#212121]">Total Amount</span>
           <span className="text-[#212121]">{formatPrice(finalAmount)}</span>
        </div>
        <div className="bg-[#e8f5e9] p-3 rounded-sm flex items-center border border-[#c8e6c9]">
           <span className="text-[#2e7d32] text-sm font-bold tracking-tight">You will save {formatPrice(discount + 1000)} on this order</span>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 flex items-center justify-center space-x-3 text-xs font-bold text-[#878787] uppercase border-t border-gray-50 bg-[#F1F3F6]/50">
         <ShieldCheck className="text-[#878787]" size={28} />
         <p className="leading-snug max-w-[200px]">Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
      </div>
    </div>
  );
};

export default OrderSummary;
