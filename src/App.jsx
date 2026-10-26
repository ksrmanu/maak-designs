
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CustomizedJewelleryPage } from './pages/CustomizedJewelleryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { WishlistPage } from './pages/WishlistPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { OffersPage } from './pages/OffersPage';
import { BulkOrderPage } from './pages/BulkOrderPage';
import { AboutPage } from './pages/AboutPage';
import { JewelleryCarePage } from './pages/JewelleryCarePage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <ShopProvider>
      <Router basename="/maak-designs">
        <ScrollToTop />

        <div className="min-h-screen flex flex-col justify-between bg-[#FAF6F0] text-[#2C2623] selection:bg-amber-200 selection:text-amber-900">
          <div>
            <Navbar />

            <main className="min-h-[calc(100vh-300px)]">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:slugOrId" element={<ProductDetailsPage />} />
                <Route path="/customized-jewellery" element={<CustomizedJewelleryPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/collections/:collectionId" element={<CollectionsPage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/bulk-order" element={<BulkOrderPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/jewellery-care" element={<JewelleryCarePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
              </Routes>
            </main>
          </div>

          <Footer />
          <FloatingWhatsApp />
        </div>
      </Router>
    </ShopProvider>
  );
}
