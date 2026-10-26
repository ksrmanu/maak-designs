import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, PenTool, ArrowRight, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage = () => {
  const { settings } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-widest">
          Our Brand Story
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-stone-900">
          Handmade with Love, <br />
          <span className="gold-gradient-text">Designed Specifically for You</span>
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          "MAAK DESIGNS creates handmade, premium-quality earrings and customized jewellery designed with care. Choose from our curated collections or place a customized order made specially for you."
        </p>
      </div>

      {/* Main Story & Values Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">
            Why Choose Handmade Jewellery?
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            In a world dominated by mass-produced factory accessories, MAAK DESIGNS was born out of a deep passion for authentic craftsmanship. Every pair of earrings is individually hand-sculpted, painted, and detailed by master women artisans.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Heart size={20} />
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-stone-900 text-base">Featherlight Comfort</h4>
                <p className="text-xs text-stone-500">Say goodbye to heavy ears. Our clay & pearl pieces are engineered to weigh under 15g per pair.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <PenTool size={20} />
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-stone-900 text-base">100% Bespoke Customization</h4>
                <p className="text-xs text-stone-500">Need earrings matching your specific bridal lehenga shade? We customize colors, length, and floral motifs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-stone-900 text-base">Small-Batch Quality Guarantee</h4>
                <p className="text-xs text-stone-500">We produce in small batches to ensure strict quality checks, skin-friendly hypoallergenic hooks, and long-lasting finish.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
              alt="Artisan Crafting MAAK DESIGNS Jewellery"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <h3 className="font-serif-luxury text-3xl font-bold">Ready to Elevate Your Style?</h3>
        <p className="text-amber-100/80 text-xs sm:text-sm max-w-xl mx-auto">
          Explore our latest collection or chat with our artisan studio on WhatsApp for customized requests.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link to="/shop" className="bg-white text-stone-900 font-bold text-xs px-6 py-3 rounded-full hover:bg-amber-100">
            Explore Collection
          </Link>
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 text-white font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 hover:bg-emerald-700"
          >
            <MessageCircle size={16} className="fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
};
