import React from 'react';
import { Star, Phone, UtensilsCrossed, Clock, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { BRANCH_INFO, STATS } from '../data/tasaData';

interface HeroProps {
  lang: Language;
  onExploreMenu: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onExploreMenu, onOpenReservation }) => {
  const isAr = lang === 'ar';

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0b0e]">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_sizzling_skillet_1787311208731.jpg"
          alt="طاسه جملي كبدة ولحوم طازجة"
          className="w-full h-full object-cover object-center scale-105 transform brightness-[0.38] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/70 to-[#0b0c10]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0b0c10]/50 to-[#0b0c10]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        {/* Rating & Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161822]/90 border border-[#d4a373]/40 text-[#f3f4f6] text-xs sm:text-sm font-medium mb-6 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-1 text-[#e5a93c]">
            <Star className="w-3.5 h-3.5 fill-[#e5a93c]" />
            <span className="font-black text-white">{STATS.rating} / 5</span>
          </div>
          <span className="text-[#6b7280]">•</span>
          <span className="text-[#d1d5db]">
            {isAr ? `أكثر من ${STATS.totalReviews} مراجعة حقيقية` : `Over ${STATS.totalReviews}+ Verified Reviews`}
          </span>
          <span className="hidden sm:inline-flex text-[#d4a373] text-xs font-semibold">
            {isAr ? 'مساكن شيراتون' : 'Sheraton Cairo'}
          </span>
        </div>

        {/* Main Punchy Display Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.2] mb-6 font-['Alexandria'] max-w-4xl mx-auto">
          {isAr ? (
            <>
              طعم الجمل... <br className="hidden sm:block" />
              <span className="copper-gradient-text">تجربة مختلفة تمامًا.</span>
            </>
          ) : (
            <>
              The Camel Taste... <br className="hidden sm:block" />
              <span className="copper-gradient-text">A Truly Distinct Experience.</span>
            </>
          )}
        </h1>

        {/* Narrative Subtitle */}
        <p className="text-base sm:text-xl text-[#d1d5db] font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
          {isAr
            ? 'نقدم لكم أجود اللحوم والأطباق الجمليّة البلدي، محضّرة أمامكم على الصاج الساخن بعناية وبنكهة مصرية أصيلة لا تُنسى.'
            : 'Savor prime daily fresh camel meat and signature liver skillets, seared live before your eyes with authentic Egyptian mastery in Sheraton.'}
        </p>

        {/* Primary High-Conversion Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto mb-10">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#d4a373] hover:bg-[#c49258] text-[#0b0c10] font-black text-sm sm:text-base transition-all duration-200 shadow-lg shadow-[#d4a373]/20 hover:scale-[1.02] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>{isAr ? 'عرض القائمة والطلب' : 'Explore Menu & Order'}</span>
          </button>

          <a
            href={`tel:${BRANCH_INFO.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1a1d26] hover:bg-[#252836] border border-[#2e3240] hover:border-[#d4a373]/60 text-white font-bold text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a373]"
          >
            <Phone className="w-4 h-4 text-[#d4a373]" />
            <span>{isAr ? 'اتصل بنا الآن' : 'Call Directly'}</span>
          </a>
        </div>

        {/* 3 Quick Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto pt-6 border-t border-[#252836]/60 text-xs sm:text-sm text-[#9ca3af]">
          <div className="flex items-center justify-center gap-2 bg-[#12141c]/60 p-2.5 rounded-lg border border-[#202330]">
            <Sparkles className="w-4 h-4 text-[#d4a373] shrink-0" />
            <span className="text-[#e5e7eb] font-semibold">{isAr ? 'التحضير المباشر أمامك' : 'Live Skillet Cooking'}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-[#12141c]/60 p-2.5 rounded-lg border border-[#202330]">
            <Clock className="w-4 h-4 text-[#d4a373] shrink-0" />
            <span className="text-[#e5e7eb] font-semibold">{isAr ? 'مفتوح حتى 5:00 فجراً' : 'Open Until 5:00 AM'}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-[#12141c]/60 p-2.5 rounded-lg border border-[#202330]">
            <MapPin className="w-4 h-4 text-[#d4a373] shrink-0" />
            <span className="text-[#e5e7eb] font-semibold">{isAr ? '13 صقر قريش - شيراتون' : 'Sheraton Heliopolis'}</span>
          </div>
        </div>
      </div>

      {/* Down Arrow Cue */}
      <a
        href="#why-us"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#9ca3af] hover:text-[#d4a373] transition-colors p-2 z-10 animate-bounce"
        aria-label="الانتقال للأسفل"
      >
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
};
