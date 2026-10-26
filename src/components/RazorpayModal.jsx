import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Smartphone, Building, Lock, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const RazorpayModal = ({ isOpen, onClose, amount, customerInfo, onSuccess }) => {
  const { settings } = useShop();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('customer@upi');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('form'); // 'form' | 'verifying' | 'success'

  if (!isOpen) return null;

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStep('verifying');

    // Simulate Server-side Razorpay Order Creation -> Client Checkout -> Server Signature Verification
    setTimeout(() => {
      const simulatedRazorpayOrderId = `order_${Math.random().toString(36).substring(2, 11)}`;
      const simulatedRazorpayPaymentId = `pay_${Math.random().toString(36).substring(2, 12)}`;
      
      setPaymentStep('success');

      setTimeout(() => {
        setIsProcessing(false);
        onSuccess({
          razorpayOrderId: simulatedRazorpayOrderId,
          razorpayPaymentId: simulatedRazorpayPaymentId,
          paymentStatus: 'Paid'
        });
      }, 1200);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-amber-100 animate-fade-in">
        
        {/* Razorpay Gateway Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 flex items-center justify-between relative">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-base text-blue-200">Razorpay</span>
              <span className="bg-blue-800/80 text-[10px] text-blue-100 font-semibold px-2 py-0.5 rounded uppercase">
                Test Mode
              </span>
            </div>
            <p className="text-xs text-blue-200/80 mt-0.5">
              MAAK DESIGNS • Checkout Secure Payment
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-blue-200 block">Amount Payable</span>
            <span className="text-xl font-bold text-white">₹{amount}</span>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="absolute top-3 right-3 text-blue-200 hover:text-white p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Security Architecture Reminder Banner */}
        <div className="bg-amber-50 px-4 py-2 text-[11px] text-amber-900 border-b border-amber-200/50 flex items-center gap-2">
          <ShieldCheck size={16} className="text-amber-700 shrink-0" />
          <span>
            <strong>Secure Architecture:</strong> Key ID: <code className="bg-amber-100 px-1 rounded">{settings.razorpayKeyId}</code>. Secret Key remains encrypted on backend API.
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {paymentStep === 'form' && (
            <form onSubmit={handleSimulatePayment} className="space-y-4">
              
              {/* Payment Methods Selection */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-2">
                  Select Payment Option
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('upi')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedMethod === 'upi'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Smartphone size={20} className="mx-auto mb-1 text-indigo-600" />
                    <span className="text-xs block">UPI / GPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('card')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedMethod === 'card'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard size={20} className="mx-auto mb-1 text-indigo-600" />
                    <span className="text-xs block">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('netbanking')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedMethod === 'netbanking'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Building size={20} className="mx-auto mb-1 text-indigo-600" />
                    <span className="text-xs block">NetBanking</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Fields */}
              {selectedMethod === 'upi' && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-medium text-stone-600">UPI ID / VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="mobile@upi or name@okaxis"
                    required
                    className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:border-indigo-600 outline-none"
                  />
                  <p className="text-[10px] text-stone-400">
                    Supports Google Pay, PhonePe, Paytm, BHIM, CRED
                  </p>
                </div>
              )}

              {selectedMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-medium text-stone-600">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 2222 3333 4444"
                      required
                      className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:border-indigo-600 outline-none font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-600">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="12/28"
                        required
                        className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-600">CVV</label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        required
                        className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'netbanking' && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-medium text-stone-600">Select Bank</label>
                  <select className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none bg-white">
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Customer summary */}
              <div className="bg-stone-50 p-3 rounded-xl text-xs space-y-1 text-stone-600">
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="font-semibold text-stone-900">{customerInfo.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>WhatsApp:</span>
                  <span className="font-semibold text-stone-900">{customerInfo.whatsapp}</span>
                </div>
              </div>

              {/* Submit Payment Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/30 mt-4"
              >
                <Lock size={16} />
                <span>Pay ₹{amount} Securely</span>
              </button>
            </form>
          )}

          {paymentStep === 'verifying' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="font-bold text-stone-900 text-lg">Verifying Payment...</h4>
                <p className="text-xs text-stone-500 mt-1">
                  Connecting to Razorpay Backend API & validating HMAC Signature
                </p>
              </div>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="py-10 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="font-bold text-emerald-900 text-xl">Payment Verified!</h4>
              <p className="text-xs text-stone-500">
                Razorpay Payment Signature Validated Successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
