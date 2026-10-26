import React, { useState } from 'react';
import { MessageCircle, Camera, Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage = () => {
  const { settings } = useShop();

  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          We'd Love to Hear From You
        </span>
        <h1 className="font-serif-luxury text-4xl font-bold text-stone-900">
          Contact MAAK DESIGNS Studio
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm">
          Have questions regarding order status, customized jewellery, or bulk discounts? Reach out to our friendly team!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Details Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-boutique space-y-6">
            <h3 className="font-serif-luxury font-bold text-stone-900 text-xl border-b border-stone-100 pb-3">
              Studio Contact Details
            </h3>

            <div className="space-y-4 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">Studio Location</span>
                  <p>{settings.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={20} className="text-amber-800 shrink-0" />
                <div>
                  <span className="font-bold text-stone-900 block">WhatsApp / Phone</span>
                  <p>{settings.whatsappDisplayNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={20} className="text-amber-800 shrink-0" />
                <div>
                  <span className="font-bold text-stone-900 block">Email Address</span>
                  <p>{settings.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={20} className="text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">Studio Working Hours</span>
                  <p>Monday - Saturday: 9:30 AM - 7:30 PM (IST)</p>
                  <p className="text-stone-400">Sunday: Closed (WhatsApp orders processed next business day)</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle size={18} className="fill-current" />
                <span>WhatsApp Us Directly</span>
              </a>

              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-purple-600 to-amber-600 text-white font-bold text-xs py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md"
              >
                <Camera size={18} />
                <span>Follow @maakdesigns_handmade</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-boutique">
          <h3 className="font-serif-luxury font-bold text-stone-900 text-xl mb-4">
            Send Us a Direct Message
          </h3>

          {sent ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-bold text-stone-900 text-lg">Message Sent!</h4>
              <p className="text-xs text-stone-500">Thank you for writing to MAAK DESIGNS. We will respond within 24 hours.</p>
              <button
                onClick={() => setSent(false)}
                className="bg-stone-900 text-white text-xs font-bold px-5 py-2.5 rounded-full"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-stone-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Radhika"
                    className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-stone-700 block mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Order Inquiry / Product Question"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-700 block mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send size={16} />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
