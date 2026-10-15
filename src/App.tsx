/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { IntroSplash } from './components/IntroSplash';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeBanner } from './components/MarqueeBanner';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedProducts } from './components/FeaturedProducts';
import { PerformanceSection } from './components/PerformanceSection';
import { SpotlightShoe } from './components/SpotlightShoe';
import { BrandStorySection } from './components/BrandStorySection';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailView } from './components/ProductDetailView';
import { ProductsListView } from './components/ProductsListView';
import { OrderCheckoutView } from './components/OrderCheckoutView';
import { OrderSuccessView } from './components/OrderSuccessView';
import { OrderFlowchartView } from './components/OrderFlowchartView';
import { AboutPithyView } from './components/AboutPithyView';
import { QuickViewModal } from './components/QuickViewModal';
import { GoogleSheetsGuideModal } from './components/GoogleSheetsGuideModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { currentPage } = useShop();
  const [sheetsModalOpen, setSheetsModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(() => {
    // Show splash once per session
    try {
      const shown = sessionStorage.getItem('pithy_intro_shown');
      return !shown;
    } catch {
      return true;
    }
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    try {
      sessionStorage.setItem('pithy_intro_shown', 'true');
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F7F7F5] selection:bg-[#C6FF3D] selection:text-[#0B0B0D] flex flex-col">
      {/* 1.5-2s Intro luxury splash */}
      {showSplash && <IntroSplash onComplete={handleSplashComplete} />}

      {/* Global Navigation */}
      <Navbar onOpenSheetsGuide={() => setSheetsModalOpen(true)} />

      {/* Dynamic Main View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <HeroSection />
            <MarqueeBanner />
            <CategoryShowcase />
            <FeaturedProducts />
            <PerformanceSection />
            <SpotlightShoe />
            <BrandStorySection />
            <CallToAction />
          </>
        )}

        {currentPage === 'products' && <ProductsListView />}
        {currentPage === 'badminton' && <ProductsListView initialCategory="badminton" />}
        {currentPage === 'tennis' && <ProductsListView initialCategory="tennis" />}
        {currentPage === 'running' && <ProductsListView initialCategory="running" />}
        {currentPage === 'product-detail' && <ProductDetailView />}
        {currentPage === 'checkout' && <OrderCheckoutView />}
        {currentPage === 'order-success' && <OrderSuccessView />}
        {currentPage === 'flowchart' && <OrderFlowchartView />}
        {currentPage === 'about' && <AboutPithyView />}
      </main>

      {/* Footer */}
      <Footer onOpenSheetsGuide={() => setSheetsModalOpen(true)} />

      {/* Slide-over Cart & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <GoogleSheetsGuideModal
        isOpen={sheetsModalOpen}
        onClose={() => setSheetsModalOpen(false)}
      />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
