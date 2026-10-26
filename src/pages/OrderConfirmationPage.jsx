import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ArrowRight, Package, Calendar, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { generateOrderConfirmationWhatsAppUrl, orders } = useShop();

  const order = location.state?.order || orders[0];

  useEffect(() => {
    // Fire celebratory confetti on page load
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">No Order Found</h2>
        <button onClick={() => navigate('/shop')} className="bg-stone-900 text-white font-bold text-xs px-6 py-3 rounded-full">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleSendWhatsAppConfirmation = () => {
    const url = generateOrderConfirmationWhatsAppUrl(order);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Success Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-100 shadow-2xl text-center space-y-6">
        
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={48} />
        </div>

        <div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Order Placed Successfully
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
            Thank You for Your Order!
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            We have received your order and our artisans are preparing your handmade jewellery.
          </p>
        </div>

        {/* Key Info Banner */}
        <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left text-xs">
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Order Number</span>
            <span className="font-bold text-stone-900 font-mono text-sm">{order.orderId}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Payment Status</span>
            <span className={`font-bold ${order.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-800'}`}>
              {order.paymentStatus}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Total Amount</span>
            <span className="font-bold text-stone-900 text-sm">₹{order.totalAmount}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Payment Method</span>
            <span className="font-bold text-stone-900">{order.paymentMethod}</span>
          </div>
        </div>

        {/* Itemized Order List */}
        <div className="text-left space-y-3 pt-2">
          <h4 className="font-serif-luxury font-bold text-stone-900 text-base border-b border-stone-100 pb-2">
            Order Summary ({order.items.length} items)
          </h4>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs bg-stone-50 p-3 rounded-xl border border-stone-100">
                <div className="flex items-center gap-3">
                  <img
                    src={item.images ? item.images[0] : "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=100&q=80"}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <h5 className="font-bold text-stone-900">{item.name}</h5>
                    <span className="text-stone-400">Color: {item.selectedColor || item.color} | Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="font-bold text-stone-900">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-stone-50 p-3 rounded-xl text-xs space-y-1 text-stone-600">
            <span className="font-bold text-stone-800 block">Delivery Address:</span>
            <p>{order.address}</p>
            <p className="text-[11px] text-stone-400 mt-1">Recipient: {order.customerName} ({order.whatsapp})</p>
          </div>
        </div>

        {/* WhatsApp Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={handleSendWhatsAppConfirmation}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 cursor-pointer transition-all"
          >
            <MessageCircle size={20} className="fill-current" />
            <span>Send Order Confirmation on WhatsApp</span>
          </button>

          <Link
            to="/shop"
            className="block text-center text-xs font-semibold text-stone-600 hover:text-stone-900 pt-2"
          >
            ← Continue Browsing Collections
          </Link>
        </div>

      </div>
    </div>
  );
};
