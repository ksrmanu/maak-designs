import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  MessageCircle, 
  Sparkles, 
  Crown, 
  ShieldCheck,
  Home,
  Grid,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, wishlist, settings, products } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Handle live search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'Customized Jewellery', path: '/customized-jewellery', highlight: true },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleWhatsAppHeader = () => {
    const text = encodeURIComponent("Hello MAAK DESIGNS, I want to explore your handmade jewellery range!");
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-50 text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-amber-300 animate-pulse" />
        <span>Handmade with Love • Free Shipping on Orders Above ₹{settings.freeDeliveryThreshold}!</span>
        <span className="hidden md:inline text-amber-300">| Order Direct on WhatsApp</span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'glass-header shadow-boutique border-b border-amber-100/60' : 'bg-cream border-b border-amber-100/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal hover:text-amber-800 rounded-lg"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-charcoal hover:text-amber-800 rounded-lg"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>

            {/* =========================================
                LOGO SECTION (UPDATED)
                Place your logo.png in the public folder
               ========================================= */}
            <Link to="/" className="flex items-center group py-1">
              <img
                src="/logo.png" 
                alt="MAAK DESIGNS Logo"
                className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
              />
            </Link>
            {/* ========================================= */}

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                      isActive
                        ? 'text-amber-800 font-semibold'
                        : link.highlight
                        ? 'text-amber-900 font-semibold hover:text-amber-700'
                        : 'text-stone-700 hover:text-amber-800'
                    }`}
                  >
                    {link.name}
                    {link.highlight && (
                      <span className="absolute -top-2 -right-3 text-[9px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                        NEW
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Search Toggle (Desktop) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 text-stone-700 hover:text-amber-800 bg-amber-50/60 hover:bg-amber-100/60 px-3 py-1.5 rounded-full text-xs font-medium border border-amber-200/50 transition-all"
              >
                <Search size={15} />
                <span>Search jewellery...</span>
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2 text-stone-700 hover:text-rose-600 transition-colors"
                title="Wishlist"
              >
                <Heart size={22} />
                {totalWishlistItems > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2 text-stone-700 hover:text-amber-800 transition-colors"
                title="Shopping Cart"
              >
                <ShoppingBag size={22} />
                {totalCartItems > 0 && (
                  <span className="absolute top-1 right-1 bg-amber-800 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                    {totalCartItems}
                  </span>
                )}
              </Link>

              {/* WhatsApp Header Action (Desktop) */}
              <button
                onClick={handleWhatsAppHeader}
                className="hidden md:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-all shadow-sm cursor-pointer"
              >
                <MessageCircle size={15} className="fill-current" />
                <span>WhatsApp Order</span>
              </button>

              {/* Admin Dashboard Entry link */}
              <Link
                to="/admin"
                className="p-1.5 text-stone-500 hover:text-amber-800 bg-stone-100 hover:bg-amber-100 rounded-full transition-colors"
                title="Admin Portal"
              >
                <UserCheck size={18} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative bg-white w-4/5 max-w-sm h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                {/* =========================================
                    MOBILE LOGO SECTION (UPDATED)
                   ========================================= */}
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <img
                    src="/logo.png"
                    alt="MAAK DESIGNS Logo"
                    className="h-16 w-auto object-contain"
                  />
                </Link>
                {/* ========================================= */}
                
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-base font-medium text-stone-800 hover:text-amber-800 py-1.5 border-b border-stone-50"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Link
                  to="/bulk-order"
                  className="block text-sm font-semibold text-amber-800 bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-200/60 mt-4"
                >
                  ✨ Bulk & Wholesale Orders
                </Link>

                <Link
                  to="/jewellery-care"
                  className="block text-sm text-stone-600 hover:text-amber-800 py-1"
                >
                  💎 Jewellery Care Guide
                </Link>

                <Link
                  to="/admin"
                  className="block text-sm text-stone-600 hover:text-amber-800 py-1"
                >
                  🔐 Admin Dashboard Portal
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={handleWhatsAppHeader}
                className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle size={18} className="fill-current" />
                <span>Order via WhatsApp</span>
              </button>
              <p className="text-center text-[11px] text-stone-400 mt-3">
                Call / WhatsApp: {settings.whatsappDisplayNumber}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in border border-amber-100">
            <div className="p-4 border-b border-stone-100 flex items-center gap-3">
              <Search size={20} className="text-amber-700" />
              <input
                type="text"
                placeholder="Search earrings, jhumkas, material, code (e.g. Kundan, MD-ER-001)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-base text-stone-900 placeholder-stone-400 outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-stone-400 hover:text-stone-800 p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto p-4">
              {searchQuery.trim().length === 0 ? (
                <div className="text-center py-6 text-stone-400 text-sm">
                  Type at least 2 characters to search MAAK DESIGNS collections...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(`/product/${item.slug || item.id}`);
                        setSearchOpen(false);
                      }}
                      className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-amber-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-xl"
                      />
                      <div className="flex-grow">
                        <h4 className="font-semibold text-stone-900 text-sm">
                          {item.name}
                        </h4>
                        <span className="text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md font-medium">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-stone-900">
                          ₹{item.price}
                        </div>
                        {item.originalPrice > item.price && (
                          <div className="text-xs text-stone-400 line-through">
                            ₹{item.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-stone-500 text-sm">
                  No jewellery matching "{searchQuery}" found. Try searching "Jhumka" or "Studs".
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-amber-100 py-2 px-6 shadow-lg">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === '/' ? 'text-amber-800 font-semibold' : 'text-stone-500'
            }`}
          >
            <Home size={20} />
            <span className="text-[11px]">Home</span>
          </Link>

          <Link
            to="/shop"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === '/shop' ? 'text-amber-800 font-semibold' : 'text-stone-500'
            }`}
          >
            <Grid size={20} />
            <span className="text-[11px]">Shop</span>
          </Link>

          <Link
            to="/wishlist"
            className={`flex flex-col items-center gap-1 relative ${
              location.pathname === '/wishlist' ? 'text-amber-800 font-semibold' : 'text-stone-500'
            }`}
          >
            <Heart size={20} />
            {totalWishlistItems > 0 && (
              <span className="absolute -top-1 right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalWishlistItems}
              </span>
            )}
            <span className="text-[11px]">Wishlist</span>
          </Link>

          <Link
            to="/cart"
            className={`flex flex-col items-center gap-1 relative ${
              location.pathname === '/cart' ? 'text-amber-800 font-semibold' : 'text-stone-500'
            }`}
          >
            <ShoppingBag size={20} />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 right-1 bg-amber-800 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
            <span className="text-[11px]">Cart</span>
          </Link>
        </div>
      </div>
    </>
  );
};