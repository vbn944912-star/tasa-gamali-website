import React from 'react';
import { Heart, Zap, Shield, Sparkles, Activity } from 'lucide-react';
import { Language } from '../types';
import { CAMEL_MEAT_BENEFITS } from '../data/tasaData';

interface HealthBenefitsProps {
  lang: Language;
}

export const HealthBenefits: React.FC<HealthBenefitsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const icons = [Heart, Zap, Activity, Shield];

  return (
    <section className="py-20 bg-[#0b0c10] border-b border-[#202330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181a24] border border-[#d4a373]/30 text-[#d4a373] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'القيمة الغذائية والصحية' : 'Health & Nutrition'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 font-['Alexandria']">
            {isAr ? (
              <>
                لماذا اللحم الجملي؟ <span className="copper-gradient-text">طاقة ونقاء وصحة</span>
              </>
            ) : (
              <>
                Why Camel Meat? <span className="copper-gradient-text">Pure, Lean & Nutritious</span>
              </>
            )}
          </h2>

          <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'اللحم الجملي من أصح وأخف أنواع اللحوم الحمراء على الإطلاق، غني بالبروتينات والحديد مع أقل نسبة دهون.'
              : 'One of the leanest red meats on Earth — loaded with bioavailable iron, low in cholesterol, and easily digestible.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAMEL_MEAT_BENEFITS.map((benefit, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="bg-[#12141c] border border-[#202434] hover:border-[#d4a373]/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1c202d] border border-[#2b3144] flex items-center justify-center text-[#d4a373]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#d4a373] bg-[#1a1d28] px-2.5 py-1 rounded-md border border-[#2c3144]">
                      {benefit.stat}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 font-['Alexandria']">
                    {isAr ? benefit.titleAr : benefit.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                    {isAr ? benefit.descriptionAr : benefit.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
