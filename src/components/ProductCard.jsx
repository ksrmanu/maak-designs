import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, generateSingleProductWhatsAppUrl } = useShop();

  const isWishlisted = isInWishlist(product.id);

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();
    const url = generateSingleProductWhatsAppUrl(product, 1);
    window.open(url, '_blank');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-amber-50 shadow-boutique shadow-boutique-hover flex flex-col justify-between relative transition-all duration-300">
      {/* Badges & Actions */}
      <div className="relative aspect-square overflow-hidden bg-amber-50/50 cursor-pointer" onClick={() => navigate(`/product/${product.slug || product.id}`)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-amber-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.discount}% OFF
          </span>
        )}

        {/* Collection Badge */}
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            Best Seller
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            isWishlisted
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/90 backdrop-blur-md text-gray-600 hover:text-rose-500 hover:bg-white'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
        </button>

        {/* Quick hover detail preview */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <span className="text-white text-xs font-medium backdrop-blur-sm bg-white/20 px-3 py-1 rounded-full border border-white/30">
            View Details
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span className="font-medium text-gray-700">{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.slug || product.id}`}>
            <h3 className="font-serif-luxury text-base font-semibold text-gray-900 group-hover:text-amber-800 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-1 mb-3">
            {product.material}
          </p>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-stone-900 hover:bg-amber-800 text-white text-xs font-semibold py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-colors duration-200 cursor-pointer shadow-sm"
              title="Order directly on WhatsApp"
            >
              <MessageCircle size={14} className="fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
