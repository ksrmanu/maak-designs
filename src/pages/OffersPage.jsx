import React from 'react';
import { Tag, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const OffersPage = () => {
  const { products } = useShop();

  const offerProducts = products.filter((p) => p.isOffer || p.discount >= 20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Offers Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-amber-900 to-rose-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-3 relative overflow-hidden">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-rose-950 px-3 py-1 rounded-full border border-rose-700">
          Limited Time Festive Offers
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold">
          Special Discounts & Handcrafted Deals
        </h1>
        <p className="text-xs sm:text-sm text-rose-100/80 max-w-xl">
          Enjoy special price cuts on our handmade jhumkas, stud packs, and bespoke combos. Free delivery on orders above ₹999!
        </p>
      </div>

      {/* Offer Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-boutique space-y-2 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <Gift size={22} />
          </div>
          <h3 className="font-serif-luxury font-bold text-stone-900 text-lg">Buy 2 Get Special Discount</h3>
          <p className="text-xs text-stone-500">Automatic price reduction applied at checkout for multi-pair purchases.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-boutique space-y-2 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <Sparkles size={22} />
          </div>
          <h3 className="font-serif-luxury font-bold text-stone-900 text-lg">Free Festive Gift Wrap</h3>
          <p className="text-xs text-stone-500">Every order above ₹500 comes in a handcrafted gift box.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-boutique space-y-2 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Tag size={22} />
          </div>
          <h3 className="font-serif-luxury font-bold text-stone-900 text-lg">Wholesale Bulk Deals</h3>
          <p className="text-xs text-stone-500">Up to 35% off on return gift bulk requests for weddings and events.</p>
        </div>
      </div>

      {/* Offer Products Grid */}
      <div>
        <h2 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-6">
          Discounted Handmade Jewellery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {offerProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
};
