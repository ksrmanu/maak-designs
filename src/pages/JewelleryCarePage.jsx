import React from 'react';
import { Droplet, Sun, Box, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

export const JewelleryCarePage = () => {
  const careTips = [
    {
      icon: <Droplet size={28} className="text-blue-500" />,
      title: "Keep Away From Water",
      description: "Avoid swimming, taking showers, or washing hands while wearing handmade clay or silk thread jewellery to preserve colors."
    },
    {
      icon: <AlertTriangle size={28} className="text-amber-500" />,
      title: "Apply Perfumes & Sprays First",
      description: "Put on your makeup, perfume, and hairspray before putting on your earrings. Chemical sprays can dull gold leafing."
    },
    {
      icon: <Box size={28} className="text-emerald-500" />,
      title: "Store Separately in Air-tight Box",
      description: "Store each pair in the soft zip-lock pouch or dry jewellery box provided to avoid scratches or wire tangles."
    },
    {
      icon: <Sparkles size={28} className="text-amber-600" />,
      title: "Clean Gently With Soft Cloth",
      description: "Wipe clean gently with a dry microfiber cloth after wearing to remove skin oils before storing."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          Long-lasting Beauty
        </span>
        <h1 className="font-serif-luxury text-4xl font-bold text-stone-900">
          Handmade Jewellery Care Guide
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm">
          Follow these simple care guidelines to keep your MAAK DESIGNS pieces looking vibrant and brand new for years!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careTips.map((tip, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-amber-100 shadow-boutique space-y-3 flex items-start gap-4">
            <div className="p-3 bg-stone-50 rounded-2xl shrink-0">
              {tip.icon}
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-stone-900 text-base">
                {tip.title}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
