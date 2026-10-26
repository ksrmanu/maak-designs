import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Crown, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const CollectionsPage = () => {
  const { collectionId } = useParams();
  const { collections, products } = useShop();

  const activeCollection = collections.find((c) => c.id === collectionId) || null;

  // Filter products based on selected collection
  const getCollectionProducts = () => {
    if (!collectionId) return products;

    if (collectionId === 'new-arrivals') return products.filter(p => p.isNewArrival);
    if (collectionId === 'best-sellers') return products.filter(p => p.isBestSeller);
    if (collectionId === 'under-99') return products.filter(p => p.price <= 99);
    if (collectionId === 'under-199') return products.filter(p => p.price <= 199);
    if (collectionId === 'festive-collection') return products.filter(p => p.collection === 'Festive Collection');
    if (collectionId === 'bridal-collection') return products.filter(p => p.collection === 'Bridal Collection');
    if (collectionId === 'customized-collection') return products.filter(p => p.category === 'Customized Jewellery');

    return products;
  };

  const displayedProducts = getCollectionProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-amber-700/50 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-700">
            {activeCollection ? activeCollection.badge : "MAAK DESIGNS Collections"}
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold">
            {activeCollection ? activeCollection.title : "Curated Jewellery Collections"}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
            {activeCollection
              ? activeCollection.description
              : "Discover hand-sculpted polymer clay studs, traditional jhumkas, and budget-friendly statements designed for every celebration."}
          </p>
        </div>
      </div>

      {/* Collection Navigation Filter Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          to="/collections"
          className={`text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap transition-all ${
            !collectionId ? 'bg-stone-900 text-white shadow-md' : 'bg-white text-stone-700 hover:bg-amber-50 border border-amber-200'
          }`}
        >
          All Collections
        </Link>
        {collections.map((col) => (
          <Link
            key={col.id}
            to={`/collections/${col.id}`}
            className={`text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap transition-all ${
              collectionId === col.id ? 'bg-amber-900 text-white shadow-md' : 'bg-white text-stone-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            {col.title}
          </Link>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div>
        <div className="text-xs text-stone-500 mb-4">
          Showing <span className="font-bold text-stone-900">{displayedProducts.length}</span> designs
        </div>

        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-amber-100 space-y-3">
            <h3 className="font-serif-luxury font-bold text-xl text-stone-900">
              No products found in this collection right now
            </h3>
            <Link to="/shop" className="inline-block bg-stone-900 text-white text-xs font-bold px-6 py-2.5 rounded-full">
              Explore All Products
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};
