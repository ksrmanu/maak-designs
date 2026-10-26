import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Camera, Heart, ShieldCheck, Truck, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer = () => {
  const { settings } = useShop();

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsappNumber}`, '_blank');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 lg:pb-12 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-stone-800 text-center">
          <div className="flex flex-col items-center p-3">
            <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-700/40 flex items-center justify-center text-amber-400 mb-3">
              <Sparkles size={22} />
            </div>
            <h4 className="font-serif-luxury font-semibold text-stone-100 text-base">100% Handmade</h4>
            <p className="text-xs text-stone-400 mt-1">Sculpted & detailed with love</p>
          </div>

          <div className="flex flex-col items-center p-3">
            <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-700/40 flex items-center justify-center text-amber-400 mb-3">
              <Heart size={22} />
            </div>
            <h4 className="font-serif-luxury font-semibold text-stone-100 text-base">Featherlight Comfort</h4>
            <p className="text-xs text-stone-400 mt-1">Pain-free all-day wearability</p>
          </div>

          <div className="flex flex-col items-center p-3">
            <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-700/40 flex items-center justify-center text-amber-400 mb-3">
              <Truck size={22} />
            </div>
            <h4 className="font-serif-luxury font-semibold text-stone-100 text-base">Free Delivery</h4>
            <p className="text-xs text-stone-400 mt-1">On all orders above ₹{settings.freeDeliveryThreshold}</p>
          </div>

          <div className="flex flex-col items-center p-3">
            <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-700/40 flex items-center justify-center text-amber-400 mb-3">
              <ShieldCheck size={22} />
            </div>
            <h4 className="font-serif-luxury font-semibold text-stone-100 text-base">Custom Orders</h4>
            <p className="text-xs text-stone-400 mt-1">Made specifically to your choice</p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="font-serif-luxury text-2xl font-bold text-amber-100 tracking-wider">
                MAAK DESIGNS
              </h3>
              <p className="text-xs text-amber-400 font-semibold tracking-widest uppercase">
                Handmade with Love • Designed for You
              </p>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed pr-4">
              MAAK DESIGNS creates handmade, premium-quality earrings and customized jewellery designed with care. Choose from our curated collections or place a customized order made specially for you.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 transition-all"
              >
                <MessageCircle size={16} className="fill-current" />
                <span>WhatsApp Us</span>
              </button>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 transition-all hover:opacity-90"
              >
                <Camera size={16} />
                <span>Follow Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold text-amber-200 tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">Shop All Jewellery</Link></li>
              <li><Link to="/collections" className="hover:text-amber-400 transition-colors">Collections</Link></li>
              <li><Link to="/customized-jewellery" className="text-amber-300 font-semibold hover:text-amber-200 transition-colors">Customized Order</Link></li>
              <li><Link to="/bulk-order" className="hover:text-amber-400 transition-colors">Bulk & Wholesale</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Our Studio</Link></li>
              <li><Link to="/jewellery-care" className="hover:text-amber-400 transition-colors">Jewellery Care Guide</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold text-amber-200 tracking-wider uppercase mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/shop?category=Jhumkas" className="hover:text-amber-400 transition-colors">Jhumka Earrings</Link></li>
              <li><Link to="/shop?category=Stud Earrings" className="hover:text-amber-400 transition-colors">Stud Earrings</Link></li>
              <li><Link to="/shop?category=Dangle Earrings" className="hover:text-amber-400 transition-colors">Dangle Earrings</Link></li>
              <li><Link to="/shop?category=Hoops" className="hover:text-amber-400 transition-colors">Pearl & Floral Hoops</Link></li>
              <li><Link to="/collections/festive-collection" className="hover:text-amber-400 transition-colors">Festive Special</Link></li>
              <li><Link to="/collections/under-99" className="hover:text-amber-400 transition-colors">Under ₹99 Store</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold text-amber-200 tracking-wider uppercase mb-4">
              Studio & Care
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <span>{settings.whatsappDisplayNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & policies */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            Copyright © {new Date().getFullYear()} <span className="text-amber-200 font-semibold">MAAK DESIGNS</span>. All rights reserved. Crafted with care.
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-stone-800 text-stone-300 px-2.5 py-1 rounded text-[10px]">100% Razorpay Secure</span>
            <span className="bg-stone-800 text-stone-300 px-2.5 py-1 rounded text-[10px]">UPI / Cards / COD</span>
            <Link to="/admin" className="text-amber-400 hover:underline">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
