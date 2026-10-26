import React, { useState, useRef } from 'react';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Edit3, 
  Trash2, 
  MessageCircle, 
  ShieldCheck, 
  Lock, 
  Key, 
  Settings, 
  LogOut,
  Eye,
  Sliders,
  Upload,
  ImageIcon,
  X as CloseIcon
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AdminDashboardPage = () => {
  const { 
    products, 
    orders, 
    customOrders, 
    bulkOrders, 
    settings, 
    setSettings, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus,
    isAdminLoggedIn,
    setIsAdminLoggedIn
  } = useShop();

  const [loginPin, setLoginPin] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'custom' | 'settings'

  // Product Add/Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const imageFileInputRef = useRef(null);
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    slug: '',
    category: 'Jhumkas',
    price: 199,
    originalPrice: 249,
    discount: 20,
    stockCount: 15,
    material: 'Polymer Clay',
    color: 'Crimson Red',
    size: 'Standard',
    isBestSeller: true,
    isNewArrival: true,
    isOffer: false,
    images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'],
    description: ''
  });

  // Selected order modal
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState(settings);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginPin === 'maak123' || loginPin === 'admin') {
      setIsAdminLoggedIn(true);
    } else {
      alert("Invalid Admin Passcode! Use 'maak123' or 'admin'");
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      id: `MD-ER-00${products.length + 1}`,
      name: '',
      slug: '',
      category: 'Jhumkas',
      price: 199,
      originalPrice: 249,
      discount: 20,
      stockCount: 10,
      material: 'Polymer Clay, Faux Pearls',
      color: 'Crimson Red',
      size: 'Standard',
      isBestSeller: false,
      isNewArrival: true,
      isOffer: false,
      images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'],
      description: 'Handcrafted premium earring design.'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm(prod);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const slug = productForm.slug || productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalProd = { ...productForm, slug, inStock: productForm.stockCount > 0, rating: productForm.rating || 4.9, reviewsCount: productForm.reviewsCount || 10 };

    if (editingProduct) {
      updateProduct(finalProd);
    } else {
      addProduct(finalProd);
    }
    setIsProductModalOpen(false);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettings(settingsForm);
    alert("MAAK DESIGNS Store & Payment Settings updated!");
  };

  // Calculations for Stats
  const totalSales = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const paidOrdersCount = orders.filter(o => o.paymentStatus === 'Paid').length;
  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'Processing').length;
  const lowStockCount = products.filter(p => p.stockCount <= 5).length;

  // Unauthenticated Login view
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 border border-amber-100 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mx-auto">
            <Lock size={32} />
          </div>
          <div>
            <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">
              MAAK DESIGNS Admin Portal
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Enter admin passcode to manage products, orders, and payment keys.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter passcode (e.g. maak123)"
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value)}
                required
                className="w-full text-center text-sm p-3.5 rounded-2xl border border-stone-200 focus:border-amber-600 outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs py-3.5 rounded-2xl shadow-md cursor-pointer transition-all"
            >
              Login to Portal
            </button>
            <p className="text-[10px] text-stone-400">
              Default passcode: <code className="bg-stone-100 px-1 py-0.5 rounded">maak123</code>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200/60">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full">
            Admin Management Portal
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-stone-900 mt-1">
            MAAK DESIGNS Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-xs">
          <span className="text-[10px] font-bold text-stone-400 uppercase">Total Sales</span>
          <div className="text-xl font-bold text-stone-900 mt-1">₹{totalSales}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-xs">
          <span className="text-[10px] font-bold text-stone-400 uppercase">Total Orders</span>
          <div className="text-xl font-bold text-stone-900 mt-1">{orders.length}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-xs">
          <span className="text-[10px] font-bold text-stone-400 uppercase">Paid Orders</span>
          <div className="text-xl font-bold text-emerald-700 mt-1">{paidOrdersCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-xs">
          <span className="text-[10px] font-bold text-stone-400 uppercase">Pending</span>
          <div className="text-xl font-bold text-amber-700 mt-1">{pendingOrdersCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-xs">
          <span className="text-[10px] font-bold text-stone-400 uppercase">Products</span>
          <div className="text-xl font-bold text-stone-900 mt-1">{products.length}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-xs">
          <span className="text-[10px] font-bold text-stone-400 uppercase">Low Stock (&lt;5)</span>
          <div className="text-xl font-bold text-rose-600 mt-1">{lowStockCount}</div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('orders')}
          className={`text-xs font-semibold px-4 py-2.5 rounded-t-xl transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-amber-900 text-white font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`text-xs font-semibold px-4 py-2.5 rounded-t-xl transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'bg-amber-900 text-white font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Products Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('custom')}
          className={`text-xs font-semibold px-4 py-2.5 rounded-t-xl transition-all cursor-pointer ${
            activeTab === 'custom'
              ? 'bg-amber-900 text-white font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Custom Orders ({customOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`text-xs font-semibold px-4 py-2.5 rounded-t-xl transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-amber-900 text-white font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          WhatsApp & Razorpay Settings
        </button>
      </div>

      {/* TAB 1: ORDERS TABLE */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-amber-100 shadow-boutique overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-100 font-bold text-stone-900 text-sm">
            Recent Customer Orders
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-amber-50/50 uppercase text-[10px] text-stone-500 font-bold">
                <tr>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Order Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((ord) => (
                  <tr key={ord.orderId} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-stone-900">{ord.orderId}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-stone-900">{ord.customerName}</div>
                      <div className="text-[10px] text-stone-400">{ord.whatsapp}</div>
                    </td>
                    <td className="p-3.5 text-stone-500">{ord.date}</td>
                    <td className="p-3.5 font-bold text-stone-900">₹{ord.totalAmount}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ord.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.orderId, e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-lg p-1 text-xs outline-none"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrderDetails(ord)}
                        className="text-amber-800 hover:underline font-semibold flex items-center gap-1 justify-end ml-auto"
                      >
                        <Eye size={14} />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGER TABLE */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury font-bold text-xl text-stone-900">Product Management</h3>
            <button
              onClick={handleOpenAddProduct}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Plus size={16} />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-amber-100 shadow-boutique overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-amber-50/50 uppercase text-[10px] text-stone-500 font-bold">
                  <tr>
                    <th className="p-3.5">Image</th>
                    <th className="p-3.5">Product Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">MRP</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/80">
                      <td className="p-3.5">
                        <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg" />
                      </td>
                      <td className="p-3.5 font-bold text-stone-900">{p.name}</td>
                      <td className="p-3.5">
                        <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-stone-900">₹{p.price}</td>
                      <td className="p-3.5 text-stone-400 line-through">₹{p.originalPrice}</td>
                      <td className="p-3.5 font-bold">
                        {p.stockCount > 0 ? (
                          <span className="text-emerald-700">{p.stockCount} in stock</span>
                        ) : (
                          <span className="text-rose-600">Out of Stock</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 text-amber-800 hover:bg-amber-50 rounded-lg"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOM ORDERS */}
      {activeTab === 'custom' && (
        <div className="bg-white rounded-3xl border border-amber-100 p-6 shadow-boutique space-y-4">
          <h3 className="font-serif-luxury font-bold text-xl text-stone-900">Customized Orders Received</h3>
          {customOrders.length === 0 ? (
            <p className="text-xs text-stone-500 py-6 text-center">No custom orders submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {customOrders.map((co) => (
                <div key={co.id} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>{co.name} ({co.whatsapp})</span>
                    <span className="text-amber-800">{co.jewelleryType}</span>
                  </div>
                  <p className="text-stone-600">Colour: {co.preferredColour} | Budget: {co.budgetRange}</p>
                  <p className="italic text-stone-700">"{co.details}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: STORE & PAYMENT SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-amber-100 p-6 sm:p-8 shadow-boutique max-w-2xl space-y-6">
          <h3 className="font-serif-luxury font-bold text-xl text-stone-900 pb-2 border-b border-stone-100">
            WhatsApp & Razorpay Configuration Settings
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">WhatsApp Business Number (with country code)</label>
              <input
                type="text"
                value={settingsForm.whatsappNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Free Delivery Threshold Amount (₹)</label>
              <input
                type="number"
                value={settingsForm.freeDeliveryThreshold}
                onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none"
              />
            </div>

            <div className="pt-2 border-t border-stone-100">
              <h4 className="font-bold text-indigo-900 text-sm mb-2 flex items-center gap-1.5">
                <ShieldCheck size={16} />
                <span>Razorpay Payment Gateway Settings</span>
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Razorpay Key ID</label>
                  <input
                    type="text"
                    value={settingsForm.razorpayKeyId}
                    onChange={(e) => setSettingsForm({ ...settingsForm, razorpayKeyId: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-stone-200 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Razorpay Secret Key <span className="text-rose-600 font-normal">(Never exposed on React Frontend)</span>
                  </label>
                  <input
                    type="password"
                    value="••••••••••••••••••••••••"
                    disabled
                    className="w-full text-sm p-3 rounded-xl border border-stone-200 bg-stone-100 outline-none font-mono text-stone-400"
                  />
                  <span className="text-[10px] text-stone-400 block mt-1">
                    Encrypted on Server Environment variable.
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-sm py-3.5 rounded-2xl shadow-md cursor-pointer transition-all"
            >
              Save Store Settings
            </button>
          </form>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 my-8 shadow-2xl border border-amber-100">
            <h3 className="font-serif-luxury font-bold text-xl text-stone-900">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-xl border border-stone-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-xl border border-stone-200 outline-none bg-white"
                  >
                    <option>Earrings</option>
                    <option>Stud Earrings</option>
                    <option>Dangle Earrings</option>
                    <option>Jhumkas</option>
                    <option>Hoops</option>
                    <option>Handmade Collections</option>
                    <option>Customized Jewellery</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                    className="w-full text-sm p-2.5 rounded-xl border border-stone-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full text-sm p-2.5 rounded-xl border border-stone-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Original Price</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full text-sm p-2.5 rounded-xl border border-stone-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Discount %</label>
                  <input
                    type="number"
                    value={productForm.discount}
                    onChange={(e) => setProductForm({ ...productForm, discount: Number(e.target.value) })}
                    className="w-full text-sm p-2.5 rounded-xl border border-stone-200 outline-none"
                  />
                </div>
              </div>

              {/* ============ IMAGE UPLOAD SECTION ============ */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">Product Image</label>

                {/* Image Preview */}
                {productForm.images[0] && (
                  <div className="relative mb-2">
                    <img
                      src={productForm.images[0]}
                      alt="Product preview"
                      className="w-full h-40 object-cover rounded-xl border border-stone-200"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, images: [''] })}
                      className="absolute top-1.5 right-1.5 bg-white/90 hover:bg-white rounded-full p-1 shadow-md text-rose-600"
                    >
                      <CloseIcon size={14} />
                    </button>
                  </div>
                )}

                {/* Upload Button */}
                <button
                  type="button"
                  onClick={() => imageFileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-amber-300 hover:border-amber-500 hover:bg-amber-50 rounded-xl py-4 text-amber-800 font-semibold text-xs transition-all cursor-pointer"
                >
                  <Upload size={18} />
                  <span>Upload Image from Your Computer / Gallery</span>
                </button>

                {/* Hidden file input */}
                <input
                  ref={imageFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setProductForm({ ...productForm, images: [ev.target.result] });
                    };
                    reader.readAsDataURL(file);
                  }}
                />

                {/* URL fallback */}
                <div className="mt-2 flex items-center gap-2">
                  <ImageIcon size={14} className="text-stone-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Or paste an image URL (https://...)"
                    value={productForm.images[0]?.startsWith('data:') ? '' : productForm.images[0]}
                    onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                    className="w-full text-xs p-2 rounded-lg border border-stone-200 outline-none text-stone-600 placeholder-stone-300"
                  />
                </div>
                <p className="text-[10px] text-stone-400 mt-1">
                  Upload from any folder (JPG, PNG, WEBP) — or paste a URL above.
                </p>
              </div>
              {/* ============================================= */}

              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="bg-stone-100 text-stone-700 text-xs font-bold px-4 py-2.5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-stone-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details View Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl border border-amber-100">
            <h3 className="font-serif-luxury font-bold text-lg text-stone-900">
              Order #{selectedOrderDetails.orderId} Details
            </h3>

            <div className="space-y-2 text-xs text-stone-700 bg-stone-50 p-3 rounded-2xl">
              <div><strong>Customer:</strong> {selectedOrderDetails.customerName} ({selectedOrderDetails.whatsapp})</div>
              <div><strong>Address:</strong> {selectedOrderDetails.address}</div>
              <div><strong>Payment Method:</strong> {selectedOrderDetails.paymentMethod}</div>
              <div><strong>Razorpay Order ID:</strong> {selectedOrderDetails.razorpayOrderId || 'N/A'}</div>
              <div><strong>Razorpay Payment ID:</strong> {selectedOrderDetails.razorpayPaymentId || 'N/A'}</div>
            </div>

            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="w-full bg-stone-900 text-white font-bold text-xs py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
