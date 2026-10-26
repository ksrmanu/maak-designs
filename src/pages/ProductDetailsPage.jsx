import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Minus, 
  Plus, 
  ArrowLeft,
  Share2,
  Info
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailsPage = () => {
  const { slugOrId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, generateSingleProductWhatsAppUrl, settings } = useShop();

  // Find product by slug or id
  const product = products.find(
    (p) => p.slug === slugOrId || p.id === slugOrId || p.id.toLowerCase() === slugOrId.toLowerCase()
  ) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors ? product.availableColors[0] : product.color
  );
  const [selectedSize, setSelectedSize] = useState(
    product.availableSizes ? product.availableSizes[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleWhatsAppOrder = () => {
    const url = generateSingleProductWhatsAppUrl(product, quantity, selectedColor);
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Shop</span>
        </button>
        <div className="hidden sm:flex items-center gap-2 text-stone-400">
          <Link to="/" className="hover:text-amber-800">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-amber-800">Shop</Link>
          <span>/</span>
          <span className="text-stone-700 font-semibold">{product.category}</span>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Display Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-amber-100 shadow-boutique group">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-amber-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.discount}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md ${
                isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/90 text-stone-600 hover:text-rose-500'
              }`}
            >
              <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx ? 'border-amber-700 ring-2 ring-amber-200' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-xs font-mono text-stone-400">SKU: {product.id}</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/50">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-stone-800">{product.rating}</span>
                <span className="text-stone-400">({product.reviewsCount} reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
                <Check size={14} />
                <span>{product.inStock ? `In Stock (${product.stockCount} left)` : 'Out of Stock'}</span>
              </div>
            </div>
          </div>

          {/* Price Card */}
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-stone-900">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-base text-stone-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full ml-auto">
                Save {product.discount}%
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.availableColors && product.availableColors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-stone-800 tracking-wider">
                Select Color: <span className="text-amber-800 font-semibold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                      selectedColor === color
                        ? 'border-amber-800 bg-amber-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-amber-50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="text-xs font-bold uppercase text-stone-800 tracking-wider">
              Quantity:
            </label>
            <div className="flex items-center border border-stone-200 rounded-xl bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-stone-600 hover:text-stone-900"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 font-bold text-sm text-stone-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-stone-600 hover:text-stone-900"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Buy Now (Online Pay)</span>
              </button>
            </div>

            {/* Direct WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <MessageCircle size={20} className="fill-current" />
              <span>Order Directly on WhatsApp</span>
            </button>
          </div>

          {/* Product Specifications */}
          <div className="border-t border-b border-stone-200 py-4 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span className="font-semibold text-stone-900">Material:</span>
              <span>{product.material}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-stone-900">Weight:</span>
              <span>{product.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-stone-900">Dimensions:</span>
              <span>{product.size}</span>
            </div>
          </div>

          {/* Free Shipping Highlight */}
          <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200/60 flex items-center gap-3 text-xs text-amber-950">
            <Truck size={20} className="text-amber-800 shrink-0" />
            <div>
              <span className="font-bold">Free Delivery on Orders Above ₹{settings.freeDeliveryThreshold}!</span>
              <p className="text-[11px] text-stone-600">Dispatched in 24 hours. Estimated delivery 3-5 business days.</p>
            </div>
          </div>

          {/* Care Instructions */}
          {product.careInstructions && (
            <div className="bg-white p-4 rounded-2xl border border-stone-200/80 space-y-2">
              <h4 className="font-serif-luxury font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <Info size={16} className="text-amber-700" />
                <span>Jewellery Care Guidelines</span>
              </h4>
              <ul className="list-disc list-inside text-xs text-stone-600 space-y-1 pl-1">
                {product.careInstructions.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-amber-100">
          <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-6">
            You May Also Love
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
