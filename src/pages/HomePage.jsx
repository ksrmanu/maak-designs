import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MessageCircle,
  ArrowRight,
  Star,
  Heart,
  ShieldCheck,
  Truck,
  Gift,
  PenTool,
  Camera,
  CheckCircle2,
  Crown,
  ChevronRight,
  Hand,
  Gem,
  Palette,
  Clock,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const HomePage = () => {
  const navigate = useNavigate();
  const { products, categories, collections, reviews, settings } = useShop();
  const [activeTab, setActiveTab] = useState('all');
  const [heroIndex, setHeroIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState('all'); // 'all' | 'handmade' | 'fancy'
  const [countdown, setCountdown] = useState({ h: 11, m: 24, s: 58 });

  const heroImages = [
    { src: '/images/hero-1.jpg', label: 'Handmade Kundan Jhumka' },
    { src: '/images/hero-2.jpg', label: 'Fancy AD Stone Studs' },
    { src: '/images/hero-3.jpg', label: 'Custom Bridal Set' }
  ];

  // Hero image auto-rotation
  useEffect(() => {
    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Countdown timer
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
            else return { h: 23, m: 59, s: 59 };
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Filter products based on tab AND display mode (handmade vs fancy)
  const getDisplayedProducts = () => {
    let list = products;

    if (displayMode === 'handmade') {
      list = list.filter((p) => p.tags?.includes('handmade') || p.isHandmade);
    } else if (displayMode === 'fancy') {
      list = list.filter((p) => p.tags?.includes('fancy') || p.isFancy);
    }

    if (activeTab === 'bestsellers') list = list.filter((p) => p.isBestSeller);
    if (activeTab === 'new') list = list.filter((p) => p.isNewArrival);
    if (activeTab === 'offers') list = list.filter((p) => p.isOffer);

    return list.slice(0, 8);
  };

  const handleHeroWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello MAAK DESIGNS!\nI would like to explore your handmade jewellery and ask a few questions.'
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
  };

  const trustBadges = [
    { icon: Hand, label: 'Handmade with Love', sub: 'Artisan-crafted' },
    { icon: Truck, label: 'Free Shipping', sub: `Above ₹${settings.freeDeliveryThreshold}` },
    { icon: ShieldCheck, label: 'Secure Payments', sub: 'Razorpay & COD' },
    { icon: Gift, label: 'Gift Wrapping', sub: 'Free packaging' }
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Happy Customers' },
    { icon: Star, value: '4.9★', label: 'Average Rating' },
    { icon: Gem, value: '3000+', label: 'Designs Sold' },
    { icon: Award, value: '2 Yrs', label: 'Artisan Studio' }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">

      {/* ============================================================
          1. TOP FESTIVE OFFER STRIP WITH LIVE COUNTDOWN
         ============================================================ */}
      <section className="bg-gradient-to-r from-rose-900 via-amber-800 to-rose-900 text-white text-center py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
          <Sparkles size={16} className="text-amber-300 animate-pulse" />
          <span>Festive Sale is LIVE — Flat 20% OFF on Handmade Jhumkas!</span>
          <span className="hidden sm:inline-flex items-center gap-1 bg-black/30 px-2.5 py-1 rounded-full font-mono">
            <Clock size={12} />
            <span>
              {String(countdown.h).padStart(2, '0')}:
              {String(countdown.m).padStart(2, '0')}:
              {String(countdown.s).padStart(2, '0')}
            </span>
          </span>
          <Link
            to="/offers"
            className="underline underline-offset-2 hover:text-amber-200 font-bold"
          >
            Shop Offers →
          </Link>
        </div>
      </section>

      {/* ============================================================
          2. INTERACTIVE HERO SECTION
         ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-cream to-amber-50/40 pt-6 pb-20 md:py-20 border-b border-amber-100/60">
        {/* Decorative blurred blobs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left — Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-amber-900 border border-amber-200/80 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-xs">
                <Sparkles size={14} className="text-amber-600 animate-spin" />
                <span>Handmade • Fancy Resale • Customized</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1]">
                Handmade Elegance,
                <br />
                <span className="gold-gradient-text">Fancy Vibes</span>
                <span className="text-amber-700">.</span>
              </h1>

              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                From soft handcrafted clay jhumkas to trending fancy AD stone earrings —
                MAAK DESIGNS is your one-stop boutique for every mood and occasion.
              </p>

              {/* Dual Category Quick Picker */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 pt-2">
                <Link
                  to="/shop?category=Handmade%20Collections"
                  className="group bg-white rounded-2xl p-4 border border-amber-100 hover:border-amber-400 shadow-boutique hover:shadow-xl transition-all flex items-center gap-3 text-left"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Hand size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Handmade</h4>
                    <p className="text-[10px] text-stone-500">Clay • Silk Thread</p>
                  </div>
                </Link>

                <Link
                  to="/shop?category=Fancy%20Resale"
                  className="group bg-white rounded-2xl p-4 border border-rose-100 hover:border-rose-400 shadow-boutique hover:shadow-xl transition-all flex items-center gap-3 text-left"
                >
                  <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Gem size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Fancy Resale</h4>
                    <p className="text-[10px] text-stone-500">AD • Kundan • Stones</p>
                  </div>
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
                <Link
                  to="/shop"
                  className="bg-stone-900 hover:bg-amber-800 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={18} />
                </Link>

                <button
                  onClick={handleHeroWhatsApp}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3.5 rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <MessageCircle size={18} className="fill-current" />
                  <span>Order on WhatsApp</span>
                </button>

                <Link
                  to="/customized-jewellery"
                  className="bg-white hover:bg-amber-50 text-amber-900 font-bold text-sm px-5 py-3.5 rounded-2xl border border-amber-300/80 shadow-xs transition-all flex items-center gap-2"
                >
                  <PenTool size={16} />
                  <span>Custom Order</span>
                </Link>
              </div>
            </div>

            {/* Right — Rotating Image Carousel */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[4/5]">
                  {heroImages.map((img, i) => (
                    <img
                      key={i}
                      src={img.src}
                      alt={img.label}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        i === heroIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="bg-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full w-fit mb-2">
                      Featured This Week
                    </span>
                    <h3 className="font-serif-luxury text-2xl font-bold">
                      {heroImages[heroIndex].label}
                    </h3>
                    <p className="text-xs text-amber-200 mt-1">
                      Super lightweight • Handcrafted with love
                    </p>

                    {/* Dots */}
                    <div className="flex items-center gap-1.5 mt-3">
                      {heroImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setHeroIndex(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === heroIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Gift Card */}
                <div className="absolute -bottom-6 -left-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-amber-100 max-w-[220px] hidden sm:block animate-bounce-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                      <Gift size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Free Gift Pack</h4>
                      <p className="text-[10px] text-stone-500">On every order</p>
                    </div>
                  </div>
                </div>

                {/* Floating Rating Card */}
                <div className="absolute -top-4 -right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-amber-100 hidden sm:block">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-stone-800 mt-1">500+ Happy Buyers</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          3. TRUST BADGES ROW
         ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-5 border border-amber-100 shadow-boutique hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center group-hover:bg-amber-800 group-hover:text-white transition-colors">
                <badge.icon size={22} />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-3">
                {badge.label}
              </h4>
              <p className="text-[10px] text-stone-500 mt-0.5">{badge.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          4. TWO WORLDS — HANDMADE vs FANCY (Split Section)
         ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Two Worlds, One Boutique
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl font-bold text-stone-900 mt-3">
            Choose Your Style Story
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Whether you love the charm of handmade or the shimmer of fancy —
            we curate both, so you always find your perfect pair.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Handmade Card */}
          <Link
            to="/shop?category=Handmade%20Collections"
            className="group relative rounded-3xl overflow-hidden h-[380px] border-2 border-amber-100 shadow-boutique hover:shadow-2xl transition-all"
          >
            <img
              src="/images/handmade-banner.jpg"
              alt="Handmade Collection"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-amber-900/40 to-transparent flex flex-col justify-end p-8 text-white">
              <div className="inline-flex items-center gap-1.5 bg-amber-500 text-stone-950 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit mb-3">
                <Hand size={12} />
                <span>Handmade</span>
              </div>
              <h3 className="font-serif-luxury text-3xl font-bold">Artisan Handmade</h3>
              <p className="text-sm text-amber-100/90 mt-1">
                Polymer clay, silk thread & hand-painted designs
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-amber-300 group-hover:gap-3 transition-all">
                Explore Handmade <ArrowRight size={16} />
              </span>
            </div>
          </Link>

          {/* Fancy Card */}
          <Link
            to="/shop?category=Fancy%20Resale"
            className="group relative rounded-3xl overflow-hidden h-[380px] border-2 border-rose-100 shadow-boutique hover:shadow-2xl transition-all"
          >
            <img
              src="/images/fancy-banner.jpg"
              alt="Fancy Resale Collection"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/90 via-rose-900/40 to-transparent flex flex-col justify-end p-8 text-white">
              <div className="inline-flex items-center gap-1.5 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit mb-3">
                <Gem size={12} />
                <span>Fancy Resale</span>
              </div>
              <h3 className="font-serif-luxury text-3xl font-bold">Trendy Fancy Picks</h3>
              <p className="text-sm text-rose-100/90 mt-1">
                AD stones, American diamonds & festive bling
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-rose-300 group-hover:gap-3 transition-all">
                Explore Fancy <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ============================================================
          5. FEATURED CATEGORIES
         ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Browse By Category
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl font-bold text-stone-900 mt-3">
            Shop by Jewellery Type
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative bg-white rounded-2xl p-3 border border-amber-100 shadow-boutique hover:shadow-xl transition-all duration-300 text-center overflow-hidden flex flex-col items-center hover:-translate-y-1"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-amber-50 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-serif-luxury text-sm font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[11px] text-stone-400 mt-0.5">
                {cat.count}+ designs
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          6. FEATURED PRODUCTS with DISPLAY MODE SWITCHER
         ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Curated Selection
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl font-bold text-stone-900 mt-2">
              Featured Jewellery
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Display Mode: All / Handmade / Fancy */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-amber-200/60">
              {[
                { id: 'all', label: 'All' },
                { id: 'handmade', label: 'Handmade' },
                { id: 'fancy', label: 'Fancy' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setDisplayMode(mode.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    displayMode === mode.id
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'text-stone-600 hover:bg-amber-50'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All' },
                { id: 'bestsellers', label: 'Best Sellers' },
                { id: 'new', label: 'New' },
                { id: 'offers', label: 'Offers' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-amber-50 border border-amber-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {getDisplayedProducts().length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getDisplayedProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-amber-100">
            <Gem size={36} className="mx-auto text-amber-700 mb-3" />
            <h3 className="font-serif-luxury font-bold text-xl text-stone-900">
              Nothing to show here yet
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Try another filter or browse the full shop.
            </p>
            <Link
              to="/shop"
              className="inline-block mt-4 bg-stone-900 text-white text-xs font-bold px-5 py-2.5 rounded-full"
            >
              Browse Shop
            </Link>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white hover:bg-stone-900 hover:text-white text-stone-900 font-bold text-sm px-8 py-3.5 rounded-full border border-amber-300 shadow-md transition-all duration-300"
          >
            <span>Explore All Jewellery</span>
            <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* ============================================================
          7. ANIMATED STATS COUNTER
         ============================================================ */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="group">
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-950/60 border border-amber-600/40 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <s.icon size={24} />
                </div>
                <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-amber-100 mt-4">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-amber-300/80 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          8. CUSTOMIZED JEWELLERY BANNER
         ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white p-8 md:p-14 border border-amber-500/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-900/80 px-3 py-1 rounded-full border border-amber-600/50">
                <PenTool size={14} />
                <span>Made Specially For You</span>
              </span>
              <h2 className="font-serif-luxury text-3xl md:text-5xl font-bold leading-tight">
                Create Something <span className="text-amber-300">Truly Special</span>
              </h2>
              <p className="text-stone-300 text-sm md:text-base max-w-xl leading-relaxed">
                Have a design in mind? We create customized handmade jewellery based on your preferred colour, outfit matching, style and requirements. Share your reference photo and let us handcraft it!
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/customized-jewellery"
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-lg flex items-center gap-2"
                >
                  <span>Fill Customization Form</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/bulk-order"
                  className="bg-stone-800 hover:bg-stone-700 text-amber-200 font-semibold text-sm px-6 py-3.5 rounded-2xl border border-stone-600 transition-all"
                >
                  Request Wholesale / Bulk
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs aspect-square rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-xl">
                <img
                  src="/images/custom-banner.jpg"
                  alt="Custom Handmade Earrings"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          9. CUSTOMER REVIEWS
         ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Client Testimonials
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl font-bold text-stone-900 mt-3">
            Loved By Women Nationwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-amber-100 shadow-boutique hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 italic leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{rev.name}</h4>
                  <span className="text-[11px] text-stone-400">
                    {rev.location} • Verified Buyer
                  </span>
                </div>
                <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-1 rounded-md font-medium">
                  {rev.productName?.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          10. INSTAGRAM FEED TEASER
         ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Camera size={28} className="mx-auto text-rose-600 mb-2" />
          <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-stone-900">
            Follow <span className="text-amber-800">@maak_designs</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Tag us on Instagram to get featured in our daily handmade gallery!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            '/images/insta-1.jpg',
            '/images/insta-2.jpg',
            '/images/insta-3.jpg',
            '/images/insta-4.jpg'
          ].map((imgUrl, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/maak_designs"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm"
            >
              <img
                src={imgUrl}
                alt="Instagram MAAK DESIGNS Showcase"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera size={24} />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6">
          <a
            href="https://www.instagram.com/maak_designs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md hover:opacity-95"
          >
            <Camera size={16} />
            <span>Follow Us on Instagram</span>
          </a>
        </div>
      </section>

    </div>
  );
};