import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage = () => {
  const { wishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
          <Heart size={40} />
        </div>
        <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Your Wishlist is Empty</h2>
        <p className="text-stone-500 text-sm max-w-sm mx-auto">
          Save your favorite handmade earrings and studs here by clicking the heart icon on any product.
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
      <div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
          Your Favorite Wishlist ({wishlist.length})
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Saved handmade items ready for order or direct WhatsApp enquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
