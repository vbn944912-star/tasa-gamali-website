import React from 'react';
import { Phone, Navigation, ShoppingBag, MessageSquare, Utensils } from 'lucide-react';
import { Language } from '../types';
import { BRANCH_INFO } from '../data/tasaData';

interface FloatingActionBarProps {
  lang: Language;
  cartCount: number;
  onOpenCart: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  lang,
  cartCount,
  onOpenCart,
}) => {
  const isAr = lang === 'ar';

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0d0e14]/95 backdrop-blur-lg border-t border-[#252a3a] px-4 py-2.5 shadow-2xl transition-all sm:hidden">
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        {/* Direct Call Button (Priority 1) */}
        <a
          href={`tel:${BRANCH_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#d4a373] text-[#0b0c10] font-black text-xs shadow-md shadow-[#d4a373]/20 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4" />
          <span className="truncate">{isAr ? 'اتصال مباشر' : 'Call Now'}</span>
        </a>

        {/* Directions to Sheraton (Priority 2) */}
        <a
          href={BRANCH_INFO.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1c1f2c] border border-[#2e3448] text-white font-bold text-xs active:scale-95 transition-transform"
        >
          <Navigation className="w-3.5 h-3.5 text-[#d4a373]" />
          <span className="truncate">{isAr ? 'الاتجاهات' : 'Directions'}</span>
        </a>

        {/* Quick WhatsApp Order */}
        <a
          href="https://wa.me/201100054000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%B7%D8%A7%D8%B3%D9%87%20%D8%AC%D9%85%D9%84%D9%8A%D8%8C%20%D8%AD%D8%A7%D8%A8%D8%A8%20%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%B7%D9%84%D8%A8%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D9%85%D9%86%D9%8A%D9%88"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center p-2.5 rounded-xl bg-[#1b2b20] border border-[#235832] text-[#25D366] active:scale-95 transition-transform"
          aria-label="WhatsApp"
        >
          <MessageSquare className="w-4 h-4" />
        </a>

        {/* Cart Trigger */}
        <button
          onClick={onOpenCart}
          className="relative flex items-center justify-center p-2.5 rounded-xl bg-[#181a24] border border-[#2d3246] text-[#d4a373] active:scale-95 transition-transform"
          aria-label="Cart"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#d4a373] text-[#0b0c10] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
