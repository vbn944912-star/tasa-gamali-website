import React from 'react';
import { Phone, MapPin, Clock, Heart, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { BRANCH_INFO } from '../data/tasaData';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080b] border-t border-[#1a1d28] text-[#8e95a5] pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#181a24]">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a373] to-[#8c5825] flex items-center justify-center text-[#0b0c10] font-black text-lg">
                ط
              </span>
              <span className="text-xl font-black text-white font-['Alexandria']">
                {isAr ? 'طاسه جملي' : 'TASA GAMALI'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#8e95a5] leading-relaxed mb-6">
              {isAr
                ? 'أرقى مطعم متخصص في تقديم الكبدة واللحوم الجمليّة البلدي المحضرة طازجة أمامك في مساكن شيراتون القاهرة.'
                : 'Sheraton’s premier modern Egyptian meat house dedicated to freshly seared camel liver & artisanal grills.'}
            </p>

            <div className="text-xs text-[#d4a373] font-bold">
              ⭐ 4.1 / 5 {isAr ? '— أكثر من 480 مراجعة معتمدة' : '— 484+ Verified Reviews'}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-['Alexandria']">
              {isAr ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#why-us" className="hover:text-[#d4a373] transition-colors">
                  {isAr ? 'لماذا طاسه جملي؟' : 'Why Tasa Gamali'}
                </a>
              </li>
              <li>
                <a href="#signature" className="hover:text-[#d4a373] transition-colors">
                  {isAr ? 'الطبق المميز: كبدة جملي' : 'Signature Camel Liver'}
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#d4a373] transition-colors">
                  {isAr ? 'تجربة التحضير الحي' : 'Live Kitchen Experience'}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#d4a373] transition-colors">
                  {isAr ? 'قائمة الأسعار والطلبات' : 'Menu & Prices'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#d4a373] transition-colors">
                  {isAr ? 'آراء ومراجعات الزوار' : 'Customer Reviews'}
                </a>
              </li>
            </ul>
          </div>

          {/* Branch & Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-['Alexandria']">
              {isAr ? 'الفرع والاتصال' : 'Location & Phone'}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                <span>{isAr ? BRANCH_INFO.addressAr : BRANCH_INFO.addressEn}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4a373] shrink-0" />
                <a href={`tel:${BRANCH_INFO.phone}`} className="hover:text-white font-mono font-bold text-[#d4a373]">
                  {BRANCH_INFO.formattedPhone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                <span>{isAr ? BRANCH_INFO.hoursAr : BRANCH_INFO.hoursEn}</span>
              </li>
            </ul>
          </div>

          {/* Slogan and Late Night Badge */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-['Alexandria']">
              {isAr ? 'ضمان الجودة' : 'Quality Commitment'}
            </h4>
            <div className="bg-[#10121a] border border-[#202534] rounded-2xl p-4 text-xs space-y-2">
              <p className="text-[#c0c5d0]">
                {isAr
                  ? '✨ لحوم بلدي طازجة دبح اليوم بدون أي مجمدات أو مواد حافظة.'
                  : '✨ 100% daily fresh pasture-fed camel meat, zero frozen meats.'}
              </p>
              <p className="text-[#d4a373] font-semibold">
                {isAr ? '🔥 طشة الصاج بتوصلك بتغلي.' : '🔥 Flaming hot iron skillets.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} {isAr ? 'طاسه جملي (Tasa Gamali). جميع الحقوق محفوظة.' : 'Tasa Gamali. All rights reserved.'}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#8e95a5] hover:text-[#d4a373] cursor-pointer"
            >
              <span>{isAr ? 'للأعلى' : 'Back to top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
