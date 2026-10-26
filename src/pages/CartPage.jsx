import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Heart, ShoppingBag, MessageCircle, ArrowRight, Truck, Plus, Minus, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    getCartSubtotal,
    getCartDeliveryCharge,
    getCartGrandTotal,
    toggleWishlist,
    generateCartWhatsAppUrl,
    settings
  } = useShop();

  const subtotal = getCartSubtotal();
  const deliveryCharge = getCartDeliveryCharge();
  const grandTotal = getCartGrandTotal();

  const amountForFreeDelivery = Math.max(0, settings.freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / settings.freeDeliveryThreshold) * 100);

  const handleOrderAllOnWhatsApp = () => {
    const url = generateCartWhatsAppUrl();
    window.open(url, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-800">
          <ShoppingBag size={40} />
        </div>
        <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Your Shopping Cart is Empty</h2>
        <p className="text-stone-500 text-sm max-w-sm mx-auto">
          Explore our handmade earrings, stud collection, and jhumkas to add items to your cart.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-stone-900 text-white font-bold text-sm px-8 py-3.5 rounded-full hover:bg-amber-800 transition-colors shadow-md"
        >
          <span>Explore Jewellery</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
          Your Shopping Cart
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Review your chosen handmade jewellery pieces before checkout.
        </p>
      </div>

      {/* Free Delivery Progress Bar */}
      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/60 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-stone-800">
          <span className="flex items-center gap-1.5">
            <Truck size={16} className="text-amber-800" />
            {amountForFreeDelivery === 0 ? (
              <span className="text-emerald-700 font-bold">🎉 Congratulations! You qualify for FREE Delivery!</span>
            ) : (
              <span>Add ₹{amountForFreeDelivery} more to get FREE Delivery!</span>
            )}
          </span>
          <span>Threshold: ₹{settings.freeDeliveryThreshold}</span>
        </div>
        <div className="w-full h-2.5 bg-amber-200/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-700 transition-all duration-500 rounded-full"
            style={{ width: `${freeDeliveryProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${item.selectedColor}-${index}`}
              className="bg-white p-4 sm:p-5 rounded-3xl border border-amber-100 shadow-boutique flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h3 className="font-serif-luxury font-bold text-stone-900 text-sm sm:text-base line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="text-xs text-stone-500 space-x-2">
                    <span>Color: <strong>{item.selectedColor}</strong></span>
                    <span>•</span>
                    <span>SKU: {item.id}</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900 pt-1">
                    ₹{item.price}
                  </div>
                </div>
              </div>

              {/* Quantity Counter & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                    className="p-2 text-stone-600 hover:text-stone-900"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 font-bold text-xs text-stone-900">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                    className="p-2 text-stone-600 hover:text-stone-900"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-xs text-stone-400">Subtotal</div>
                  <div className="text-base font-bold text-stone-900">
                    ₹{item.price * item.quantity}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="p-2 text-stone-400 hover:text-rose-500 rounded-full"
                    title="Move to Wishlist"
                  >
                    <Heart size={18} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                    className="p-2 text-stone-400 hover:text-red-600 rounded-full"
                    title="Remove Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-amber-100 shadow-boutique space-y-6 sticky top-28">
          <h3 className="font-serif-luxury font-bold text-stone-900 text-xl pb-3 border-b border-stone-100">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal ({cart.length} items):</span>
              <span className="font-bold text-stone-900">₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Delivery Charge:</span>
              <span className="font-bold text-stone-900">
                {deliveryCharge === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-between text-base font-bold text-stone-900">
              <span>Grand Total:</span>
              <span className="text-xl text-amber-900">₹{grandTotal}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={handleOrderAllOnWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
            >
              <MessageCircle size={18} className="fill-current" />
              <span>Order Entire Cart on WhatsApp</span>
            </button>

            <Link
              to="/shop"
              className="block text-center text-xs font-semibold text-stone-500 hover:text-stone-900 pt-2"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
