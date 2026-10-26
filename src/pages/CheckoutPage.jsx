import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, MessageCircle, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { RazorpayModal } from '../components/RazorpayModal';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartSubtotal, getCartDeliveryCharge, getCartGrandTotal, placeOrder, settings } = useShop();

  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    whatsapp: '',
    altPhone: '',
    email: '',
    house: '',
    street: '',
    area: '',
    city: '',
    district: '',
    state: 'Kerala',
    pincode: '',
    landmark: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Razorpay Online'); // 'Razorpay Online' | 'Cash on Delivery' | 'WhatsApp Order'
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);

  const grandTotal = getCartGrandTotal();
  const subtotal = getCartSubtotal();
  const deliveryCharge = getCartDeliveryCharge();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate('/shop');
      return;
    }

    if (paymentMethod === 'Razorpay Online') {
      setIsRazorpayModalOpen(true);
    } else {
      // COD or WhatsApp direct order
      const newOrder = placeOrder({
        ...customerInfo,
        paymentMethod,
        subtotal,
        deliveryCharge,
        totalAmount: grandTotal,
        items: cart
      });

      navigate('/order-confirmation', { state: { order: newOrder } });
    }
  };

  const handleRazorpaySuccess = (razorpayResponse) => {
    setIsRazorpayModalOpen(false);

    const newOrder = placeOrder({
      ...customerInfo,
      paymentMethod: 'Razorpay Online',
      razorpayOrderId: razorpayResponse.razorpayOrderId,
      razorpayPaymentId: razorpayResponse.razorpayPaymentId,
      subtotal,
      deliveryCharge,
      totalAmount: grandTotal,
      items: cart
    });

    navigate('/order-confirmation', { state: { order: newOrder } });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">Your Cart is Empty</h2>
        <button
          onClick={() => navigate('/shop')}
          className="bg-stone-900 text-white font-bold text-xs px-6 py-3 rounded-full"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
          Delivery & Payment Checkout
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Complete your customer details to place your handmade jewellery order.
        </p>
      </div>

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Delivery Address Form */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-boutique space-y-6">
          
          <h3 className="font-serif-luxury font-bold text-stone-900 text-xl pb-3 border-b border-stone-100 flex items-center justify-between">
            <span>Customer & Delivery Details</span>
            <span className="text-xs font-normal text-stone-400">Step 1 of 2</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-stone-700 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="customerName"
                required
                value={customerInfo.customerName}
                onChange={handleInputChange}
                placeholder="e.g. Pooja Verma"
                className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-stone-700 block mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                name="whatsapp"
                required
                value={customerInfo.whatsapp}
                onChange={handleInputChange}
                placeholder="e.g. 9876543210"
                className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-stone-700 block mb-1">
                Alternative Phone Number
              </label>
              <input
                type="tel"
                name="altPhone"
                value={customerInfo.altPhone}
                onChange={handleInputChange}
                placeholder="Optional emergency phone"
                className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-stone-700 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={customerInfo.email}
                onChange={handleInputChange}
                placeholder="pooja@example.com"
                className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none"
              />
            </div>
          </div>

          {/* Address Fields */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold uppercase text-amber-900 tracking-wider">
              Shipping Address
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  House / Flat / Building Name *
                </label>
                <input
                  type="text"
                  name="house"
                  required
                  value={customerInfo.house}
                  onChange={handleInputChange}
                  placeholder="Flat 4B, Emerald Heights"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  Street / Road *
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  value={customerInfo.street}
                  onChange={handleInputChange}
                  placeholder="MG Road, near City Center"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  Area / Locality *
                </label>
                <input
                  type="text"
                  name="area"
                  required
                  value={customerInfo.area}
                  onChange={handleInputChange}
                  placeholder="Kadavanthra"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  placeholder="Kochi"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  maxLength={6}
                  value={customerInfo.pincode}
                  onChange={handleInputChange}
                  placeholder="682016"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={customerInfo.state}
                  onChange={handleInputChange}
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none bg-stone-50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={customerInfo.landmark}
                  onChange={handleInputChange}
                  placeholder="Opposite SBI Branch"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Delivery Instructions / Custom Gift Note
              </label>
              <textarea
                name="notes"
                rows={2}
                value={customerInfo.notes}
                onChange={handleInputChange}
                placeholder="e.g. Please wrap in a gift box with birthday message..."
                className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none resize-none"
              />
            </div>

          </div>
        </div>

        {/* Right Column: Payment Method & Summary */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          
          {/* Payment Method Selector */}
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-boutique space-y-4">
            <h3 className="font-serif-luxury font-bold text-stone-900 text-lg border-b border-stone-100 pb-3">
              Select Payment Method
            </h3>

            <div className="space-y-3">
              
              {/* Razorpay Online */}
              <label
                className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'Razorpay Online'
                    ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Razorpay Online"
                  checked={paymentMethod === 'Razorpay Online'}
                  onChange={() => setPaymentMethod('Razorpay Online')}
                  className="text-indigo-600"
                />
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                    <CreditCard size={16} className="text-indigo-600" />
                    <span>Razorpay Online (Cards, UPI, NetBanking)</span>
                  </div>
                  <span className="text-[10px] text-stone-500 block mt-0.5">
                    100% Instant Payment Verification
                  </span>
                </div>
              </label>

              {/* COD */}
              {settings.enableCod && (
                <label
                  className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-amber-700 bg-amber-50/60 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="text-amber-800"
                  />
                  <div>
                    <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                      <Truck size={16} className="text-amber-800" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">
                      Pay cash upon delivery at your doorstep
                    </span>
                  </div>
                </label>
              )}

              {/* Direct WhatsApp Order */}
              <label
                className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'WhatsApp Order'
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="WhatsApp Order"
                  checked={paymentMethod === 'WhatsApp Order'}
                  onChange={() => setPaymentMethod('WhatsApp Order')}
                  className="text-emerald-600"
                />
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                    <MessageCircle size={16} className="text-emerald-600 fill-current" />
                    <span>Confirm & Pay via WhatsApp</span>
                  </div>
                  <span className="text-[10px] text-stone-500 block mt-0.5">
                    Chat with studio team to confirm payment
                  </span>
                </div>
              </label>

            </div>

            {/* Total Price breakdown */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Total:</span>
                <span className="font-bold text-stone-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery Charge:</span>
                <span className="font-bold text-stone-900">
                  {deliveryCharge === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                <span>Total Amount:</span>
                <span className="text-lg text-amber-900">₹{grandTotal}</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
            >
              <Lock size={16} />
              <span>
                {paymentMethod === 'Razorpay Online' ? `Pay ₹${grandTotal} via Razorpay` : 'Complete Order'}
              </span>
            </button>

          </div>
        </div>

      </form>

      {/* Razorpay Modal Component */}
      <RazorpayModal
        isOpen={isRazorpayModalOpen}
        onClose={() => setIsRazorpayModalOpen(false)}
        amount={grandTotal}
        customerInfo={customerInfo}
        onSuccess={handleRazorpaySuccess}
      />
    </div>
  );
};
