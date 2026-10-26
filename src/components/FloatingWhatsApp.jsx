import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FloatingWhatsApp = () => {
  const { settings } = useShop();

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Hello MAAK DESIGNS,\nI would like to enquire about your handmade jewellery collection."
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 group">
      <div className="hidden md:block bg-white text-charcoal text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Chat with us on WhatsApp ✨
      </div>
      <button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 whatsapp-pulse cursor-pointer"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={28} className="fill-current" />
      </button>
    </div>
  );
};
