/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { SignatureDish } from './components/SignatureDish';
import { LiveExperience } from './components/LiveExperience';
import { MenuSection } from './components/MenuSection';
import { CustomSkilletBuilder } from './components/CustomSkilletBuilder';
import { HealthBenefits } from './components/HealthBenefits';
import { ReviewsSection } from './components/ReviewsSection';
import { VisitUs } from './components/VisitUs';
import { CartDrawer } from './components/CartDrawer';
import { FloatingActionBar } from './components/FloatingActionBar';
import { Footer } from './components/Footer';
import { CartItem, Language, MenuItem, SpiceLevel } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync HTML lang and dir attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (
    item: MenuItem,
    portionIndex?: number,
    spiceLevel: SpiceLevel = 'medium'
  ) => {
    const selectedPortion =
      portionIndex !== undefined && item.portionOptions
        ? item.portionOptions[portionIndex]
        : undefined;

    const cartId = `${item.id}-${portionIndex ?? 'default'}-${spiceLevel}-${Date.now()}`;

    const newCartItem: CartItem = {
      cartId,
      menuItem: item,
      selectedPortion,
      spiceLevel,
      quantity: 1,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    showToast(
      lang === 'ar'
        ? `تمت إضافة "${item.nameAr}" لسلة الطلب بنجاح 🥩`
        : `Added "${item.nameEn}" to your order 🥩`
    );
  };

  const handleUpdateQty = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToVisit = () => {
    const el = document.getElementById('visit-us');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-[#f3f4f6] flex flex-col font-['Alexandria'] selection:bg-[#d4a373] selection:text-[#0b0c10]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#d4a373] text-[#0b0c10] px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-2xl shadow-black/60 animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        cartCount={totalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          lang={lang}
          onExploreMenu={scrollToMenu}
          onOpenReservation={scrollToVisit}
        />

        <WhyUs lang={lang} />

        <SignatureDish
          lang={lang}
          onAddToCart={handleAddToCart}
        />

        <LiveExperience lang={lang} />

        <CustomSkilletBuilder
          lang={lang}
          onAddToCart={handleAddToCart}
        />

        <MenuSection
          lang={lang}
          onAddToCart={handleAddToCart}
        />

        <HealthBenefits lang={lang} />

        <ReviewsSection lang={lang} />

        <VisitUs lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        lang={lang}
      />

      {/* Mobile Floating Sticky Action Bar */}
      <FloatingActionBar
        lang={lang}
        cartCount={totalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
