import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Search, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, collections } = useShop();

  const selectedCategoryQuery = searchParams.get('category') || 'All';
  const selectedCollectionQuery = searchParams.get('collection') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryQuery);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          // Special category tags
          if (selectedCategory === 'New Arrivals' && !p.isNewArrival) return false;
          if (selectedCategory === 'Best Sellers' && !p.isBestSeller) return false;
          if (selectedCategory === 'Offers' && !p.isOffer) return false;
          if (selectedCategory !== 'New Arrivals' && selectedCategory !== 'Best Sellers' && selectedCategory !== 'Offers') {
            return false;
          }
        }

        // Price Filter
        if (selectedPriceRange === 'under99' && p.price > 99) return false;
        if (selectedPriceRange === '99-199' && (p.price < 99 || p.price > 199)) return false;
        if (selectedPriceRange === 'above199' && p.price < 199) return false;

        // Color Filter
        if (selectedColor !== 'all' && !p.color.toLowerCase().includes(selectedColor.toLowerCase())) return false;

        // Stock Filter
        if (inStockOnly && !p.inStock) return false;

        // Search Query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchMat = p.material.toLowerCase().includes(q);
          const matchCode = p.id.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchMat && !matchCode) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default newest
      });
  }, [products, selectedCategory, selectedPriceRange, selectedColor, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange('all');
    setSelectedColor('all');
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-100/60 via-cream to-amber-50 p-8 rounded-3xl border border-amber-200/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full">
            Handcrafted Catalogue
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            Shop Handmade Earrings
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Browse lightweight Kundan, stud, dangle & customized jewellery made with love.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-700" />
          <input
            type="text"
            placeholder="Search catalogue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-amber-200 text-xs outline-none focus:border-amber-500 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-amber-100 shadow-boutique space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <h3 className="font-serif-luxury font-bold text-stone-900 text-lg flex items-center gap-2">
              <Filter size={18} className="text-amber-800" />
              <span>Filters</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-amber-800 hover:underline flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories Filter */}
          <div>
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <div className="space-y-1.5 text-xs">
              {['All', 'Earrings', 'Stud Earrings', 'Dangle Earrings', 'Jhumkas', 'Hoops', 'Handmade Collections', 'Customized Jewellery', 'New Arrivals', 'Best Sellers', 'Offers'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-100/80 text-amber-950 font-bold border border-amber-300/60'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              Price Range
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under99', label: 'Under ₹99' },
                { id: '99-199', label: '₹99 - ₹199' },
                { id: 'above199', label: '₹199 & Above' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPriceRange(p.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                    selectedPriceRange === p.id
                      ? 'bg-amber-100/80 text-amber-950 font-bold border border-amber-300/60'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-amber-800 rounded border-stone-300 focus:ring-amber-500"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Main Product Grid Column */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Control Bar */}
          <div className="bg-white p-4 rounded-2xl border border-amber-100 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="text-xs text-stone-600">
              Showing <span className="font-bold text-stone-900">{filteredProducts.length}</span> items
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 bg-amber-50 text-amber-900 text-xs font-semibold px-3 py-2 rounded-xl border border-amber-200"
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </button>

              {/* Sort By Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-stone-50 border border-stone-200 text-stone-800 text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Cards */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-amber-100 shadow-sm space-y-4">
              <div className="w-16 h-16 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                <Search size={28} />
              </div>
              <h3 className="font-serif-luxury font-bold text-xl text-stone-900">
                No matching jewellery found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try resetting your category or price filters to see more of our handmade designs.
              </p>
              <button
                onClick={resetFilters}
                className="bg-stone-900 text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-amber-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-4/5 max-w-sm h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <h3 className="font-serif-luxury font-bold text-lg text-stone-900">Filter Jewellery</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X size={20} className="text-stone-500" />
                </button>
              </div>

              {/* Category Selector */}
              <div>
                <h4 className="text-xs font-bold uppercase text-stone-700 mb-2">Category</h4>
                <div className="space-y-1 text-xs">
                  {['All', 'Earrings', 'Stud Earrings', 'Dangle Earrings', 'Jhumkas', 'Hoops', 'Handmade Collections', 'Customized Jewellery'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs ${
                        selectedCategory === cat ? 'bg-amber-100 font-bold text-amber-950' : 'text-stone-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl text-xs"
              >
                Apply Filters ({filteredProducts.length} items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
