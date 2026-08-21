import React, { useState } from 'react';
import { Phone, ShoppingBag, Globe, Menu as MenuIcon, X, MapPin } from 'lucide-react';
import { Language } from '../types';
import { BRANCH_INFO } from '../data/tasaData';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = lang === 'ar';

  const navLinks = [
    { href: '#why-us', labelAr: 'مميزاتنا', labelEn: 'Why Us' },
    { href: '#signature', labelAr: 'الطبق المميز', labelEn: 'Signature' },
    { href: '#experience', labelAr: 'التجربة', labelEn: 'Experience' },
    { href: '#menu', labelAr: 'القائمة', labelEn: 'Menu' },
    { href: '#reviews', labelAr: 'الآراء', labelEn: 'Reviews' },
    { href: '#visit-us', labelAr: 'الموقع', labelEn: 'Location' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#252836] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title (Single text element, no wrapped subtitle) */}
        <a href="#" className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a373]">
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4a373] to-[#8c5825] flex items-center justify-center text-[#0b0c10] font-black text-xl shadow-md">
            ط
          </span>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#f3f4f6] font-['Alexandria'] hover:text-[#d4a373] transition-colors whitespace-nowrap">
            {isAr ? 'طاسه جملي' : 'TASA GAMALI'}
          </span>
        </a>

        {/* Zone 2: Navigation Links (Single line, 5-6 items, 1-2 words each) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#c0c5d0] hover:text-[#d4a373] transition-colors whitespace-nowrap py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a373] rounded-sm"
            >
              {isAr ? link.labelAr : link.labelEn}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions (1-2 primary actions + quick controls) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switch */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#2e3240] text-xs font-semibold text-[#d4a373] hover:bg-[#1a1d26] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a373]"
            title={isAr ? 'Switch to English' : 'التحويل للعربية'}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Cart / Order Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2 rounded-lg bg-[#161822] border border-[#2e3240] text-[#f3f4f6] hover:border-[#d4a373] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a373]"
            aria-label={isAr ? 'سلة الطلبات' : 'Order Cart'}
          >
            <ShoppingBag className="w-4 h-4 text-[#d4a373]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#d4a373] text-[#0b0c10] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Direct Phone Call Button */}
          <a
            href={`tel:${BRANCH_INFO.phone}`}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d4a373] hover:bg-[#c99346] text-[#0b0c10] font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#d4a373]/15 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{BRANCH_INFO.formattedPhone}</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#161822] border border-[#2e3240] text-[#f3f4f6] hover:text-[#d4a373] cursor-pointer"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1017] border-b border-[#252836] px-5 py-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#d1d5db] hover:text-[#d4a373] py-2 border-b border-[#1f2330]/50"
              >
                {isAr ? link.labelAr : link.labelEn}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-3 flex flex-col gap-2">
            <a
              href={`tel:${BRANCH_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#d4a373] text-[#0b0c10] font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{isAr ? `اتصل الآن: ${BRANCH_INFO.formattedPhone}` : `Call Now: ${BRANCH_INFO.formattedPhone}`}</span>
            </a>
            <a
              href={BRANCH_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-[#2e3240] text-[#e5e7eb] text-xs font-semibold hover:bg-[#161822]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>{isAr ? 'الاتجاهات لمساكن شيراتون' : 'Directions to Sheraton'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
