import React, { useState } from 'react';
import { Package, MessageCircle, Upload, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BulkOrderPage = () => {
  const { generateBulkOrderWhatsAppUrl, setBulkOrders } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    businessName: '',
    product: 'Handmade Earrings Assortment',
    quantity: '50 - 100 Pairs',
    budget: '₹2,000 - ₹5,000',
    requiredDate: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBulkRequest = {
      id: `BULK-${Date.now()}`,
      ...formData,
      date: new Date().toLocaleString()
    };

    setBulkOrders((prev) => [newBulkRequest, ...prev]);

    const url = generateBulkOrderWhatsAppUrl(formData);
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          <Package size={14} />
          <span>Wholesale & Bulk Supply</span>
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-stone-900">
          Bulk Orders <span className="gold-gradient-text">Available</span>
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Planning return gifts for weddings, corporate hampers, boutique reselling, or festive events? We offer special bulk pricing for wholesale handmade jewellery.
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
              Bulk Order Inquiry Sent!
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              WhatsApp has opened with your bulk order details. Our studio team will get back to you with custom wholesale pricing!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-stone-900 text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-amber-800"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
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
                  placeholder="e.g. Meera Nair"
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  WhatsApp Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Business Name / Event Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Ananya Weddings / Royal Boutique"
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Product / Category Interest *
                </label>
                <input
                  type="text"
                  required
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  placeholder="e.g. Studs, Kundan Jhumkas, Silk Thread"
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Required Quantity *
                </label>
                <select
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 outline-none bg-white"
                >
                  <option>25 - 50 Pairs</option>
                  <option>50 - 100 Pairs</option>
                  <option>100 - 250 Pairs</option>
                  <option>250+ Wholesale Pairs</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Expected Budget
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g. ₹5,000 - ₹10,000"
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                  Required Date
                </label>
                <input
                  type="date"
                  value={formData.requiredDate}
                  onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                  className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-stone-700 block mb-1.5">
                Bulk Message & Specific Instructions *
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention specific colors, packaging requirements, custom logo tags..."
                className="w-full text-sm p-3.5 rounded-2xl border border-stone-200 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all"
            >
              <MessageCircle size={22} className="fill-current" />
              <span>Request Wholesale / Bulk Order via WhatsApp</span>
            </button>

          </form>
        )}
      </div>
    </div>
  );
};
