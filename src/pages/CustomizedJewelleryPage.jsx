import React, { useState } from 'react';
import { Sparkles, MessageCircle, Upload, PenTool, CheckCircle2, Calendar } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CustomizedJewelleryPage = () => {
  const { generateCustomOrderWhatsAppUrl, setCustomOrders } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    jewelleryType: 'Earrings',
    preferredColour: 'Pastel Rose & Gold',
    preferredSize: 'Standard (3-4 cm)',
    quantity: 1,
    budgetRange: '₹200 - ₹500',
    details: '',
    deliveryDate: '',
    imagePreview: null
  });

  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to state
    const newCustomOrder = {
      id: `CUSTOM-${Date.now()}`,
      ...formData,
      date: new Date().toLocaleString()
    };
    setCustomOrders(prev => [newCustomOrder, ...prev]);

    // Generate WhatsApp link & open
    const url = generateCustomOrderWhatsAppUrl(formData);
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          <PenTool size={14} />
          <span>Bespoke Artisanal Service</span>
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-stone-900">
          Create Something <span className="gold-gradient-text">Special</span>
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Have a design in mind? We can create customized handmade jewellery based on your preferred colour, outfit matching, style and specific requirements.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-100 shadow-2xl">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-serif-luxury font-bold text-2xl text-stone-900">
              Custom Order Submitted!
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              WhatsApp has opened with your custom order requirements pre-filled. We will review your design request and get back to you shortly!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-stone-900 text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-amber-800"
            >
              Submit Another Custom Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Jewellery Type *
                </label>
                <select
                  value={formData.jewelleryType}
                  onChange={(e) => setFormData({ ...formData, jewelleryType: e.target.value })}
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none bg-white"
                >
                  <option>Earrings (Studs / Dangles)</option>
                  <option>Jhumka Earrings</option>
                  <option>Floral Pearl Hoops</option>
                  <option>Bridal Earring Set</option>
                  <option>Custom Name / Initial Jewellery</option>
                  <option>Silk Thread Jewellery</option>
                  <option>Other Handmade Design</option>
                </select>
              </div>
            </div>

            {/* Customization Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Preferred Colour *
                </label>
                <input
                  type="text"
                  required
                  value={formData.preferredColour}
                  onChange={(e) => setFormData({ ...formData, preferredColour: e.target.value })}
                  placeholder="e.g. Pastel Pink, Maroon, Kundan Gold"
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Budget Range *
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none bg-white"
                >
                  <option>Under ₹199</option>
                  <option>₹200 - ₹500</option>
                  <option>₹500 - ₹1,000</option>
                  <option>Above ₹1,000 (Bridal / Heavy)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Delivery Needed By
                </label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                Customization Details & Outfit Matching Notes *
              </label>
              <textarea
                rows={4}
                required
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Describe your vision, length preference, matching lehenga/saree colors, or specific pearls/stones..."
                className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none resize-none"
              />
            </div>

            {/* Reference Image Uploader */}
            <div>
              <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                Upload Reference Photo / Outfit Image
              </label>
              <div className="border-2 border-dashed border-amber-200 rounded-2xl p-6 text-center bg-amber-50/40 hover:bg-amber-50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="reference-image-input"
                />
                <label htmlFor="reference-image-input" className="cursor-pointer space-y-2 block">
                  {formData.imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={formData.imagePreview}
                        alt="Reference Preview"
                        className="w-28 h-28 object-cover rounded-xl mx-auto shadow-md"
                      />
                      <span className="text-xs font-bold text-amber-800 block">Change Image</span>
                    </div>
                  ) : (
                    <div>
                      <Upload size={28} className="mx-auto text-amber-700 mb-2" />
                      <span className="text-xs font-bold text-stone-800 block">Click to upload photo</span>
                      <span className="text-[11px] text-stone-400">PNG, JPG or WEBP up to 10MB</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 cursor-pointer transition-all"
            >
              <MessageCircle size={22} className="fill-current" />
              <span>Send Custom Order on WhatsApp</span>
            </button>

          </form>
        )}
      </div>
    </div>
  );
};
