import React from 'react';
import { Flame, ShieldCheck, Sparkles, HeartHandshake, Clock, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface WhyUsProps {
  lang: Language;
}

export const WhyUs: React.FC<WhyUsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const pillars = [
    {
      icon: Flame,
      titleAr: 'التحضير المباشر أمامك',
      titleEn: 'Live Sizzling Preparation',
      descAr: 'المطبخ المفتوح يتيح لك رؤية كل قطعة كبدة ولحم تُقطع وتتبل وتُطهى على صاج النار في ثوانٍ معدودة.',
      descEn: 'Our open kitchen lets you watch every cut seared to perfection in flaming cast iron skillets right in front of you.',
      badgeAr: 'طشة على أصولها',
      badgeEn: 'Live Cooking',
    },
    {
      icon: ShieldCheck,
      titleAr: 'جودة ونظافة بلا مساومة',
      titleEn: 'Pristine Hygiene & Quality',
      descAr: 'لحوم جملي بلدي طازجة مذبوحة يومياً منتقاة من أجود السلالات، بيئة تحضير معقمة ومطابقة لأعلى المقاييس.',
      descEn: '100% fresh daily Egyptian camel meat, selected with stringent butchery hygiene standards.',
      badgeAr: 'بلدي دبح اليوم',
      badgeEn: 'Daily Fresh Sourced',
    },
    {
      icon: Sparkles,
      titleAr: 'أطباق جمليّة لا مثيل لها',
      titleEn: 'Signature Camel Delicacies',
      descAr: 'من الكبدة المتبلة بالثوم والليمون، للسجق البيتي المسبك، والحواوشي المقرمش وطواجن الفخار الغنية.',
      descEn: 'From legendary garlic-seared liver to spiced artisan sausages, crispy hawawshi, and clay pots.',
      badgeAr: 'خلطة متوارثة',
      badgeEn: 'Secret Blend',
    },
    {
      icon: HeartHandshake,
      titleAr: 'خدمة محترمة وضيافة أصيلة',
      titleEn: 'Courteous & Fast Service',
      descAr: 'اهتمام فائق بكل ضيف، جلسة مريحة ونظيفة في مساكن شيراتون وسرعة قياسية في تقديم الأطباق وهي بتغلي.',
      descEn: 'Welcoming Egyptian hospitality, comfortable seating in Sheraton, and lightning-fast warm service.',
      badgeAr: 'ضيافة مصرية',
      badgeEn: 'Welcoming Team',
    },
    {
      icon: Clock,
      titleAr: 'تجربة وسهرة حتى الفجر',
      titleEn: 'Late Night Dining (5 AM)',
      descAr: 'نفتح يومياً من 12:00 ظهراً وحتى 5:00 صباحاً لتستمتع بأشهى طاسة في أي وقت من الليل.',
      descEn: 'Open every day until 5:00 AM for late-night cravings and post-work feasts.',
      badgeAr: '12 م - 5 ص',
      badgeEn: '12 PM - 5 AM',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-[#0d0e13] border-b border-[#202330] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181a24] border border-[#d4a373]/30 text-[#d4a373] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>{isAr ? 'سر تميزنا' : 'Our Hallmark'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 font-['Alexandria']">
            {isAr ? (
              <>
                لماذا يختار عشاق اللحوم <span className="copper-gradient-text">طاسه جملي؟</span>
              </>
            ) : (
              <>
                Why Meat Connoisseurs Choose <span className="copper-gradient-text">Tasa Gamali?</span>
              </>
            )}
          </h2>
          <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'لسنا مجرد مطعم أو ملحمة، بل وجهة متخصصة تُعيد تعريف تجربة اللحم الجملي المصري بفخامة واحترافية.'
              : 'More than a butcher or diner — a dedicated culinary sanctuary elevating Egyptian camel gastronomy.'}
          </p>
        </div>

        {/* Feature Cards Grid (Clean structural layout, no ghost cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#13151d] border border-[#232736] hover:border-[#d4a373]/50 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#1d202c] border border-[#2f3446] flex items-center justify-center text-[#d4a373] group-hover:scale-105 group-hover:bg-[#d4a373] group-hover:text-[#0b0c10] transition-all duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#1c1f2b] text-[#d4a373] border border-[#2c3144]">
                      {isAr ? pillar.badgeAr : pillar.badgeEn}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 font-['Alexandria'] group-hover:text-[#d4a373] transition-colors">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>

                  <p className="text-sm text-[#9ca3af] leading-relaxed">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1e2230] flex items-center gap-2 text-xs font-semibold text-[#6b7280] group-hover:text-[#d4a373] transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>{isAr ? 'معيار أساسي في كل وجبة' : 'Guaranteed in every dish'}</span>
                </div>
              </div>
            );
          })}

          {/* Interactive Stat Card for 6th Slot */}
          <div className="bg-gradient-to-br from-[#1b1e2a] to-[#12141c] border border-[#d4a373]/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#d4a373] uppercase tracking-wider block mb-2">
                {isAr ? 'تقييم الزوار الحقيقي' : 'Verified Google Rating'}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white font-['Alexandria'] mb-2 flex items-baseline gap-2">
                <span>4.1</span>
                <span className="text-base text-[#9ca3af] font-normal">/ 5.0</span>
              </div>
              <p className="text-sm text-[#c0c5d0] leading-relaxed">
                {isAr
                  ? 'أكثر من 484 عميل شاركوا تجاربهم الإيجابية عن نظافة المكان، جودة الكبدة الجملي، والتحضير المباشر.'
                  : 'Over 484 diners shared their praise for our fresh camel liver, immaculate hygiene, and blazing skillets.'}
              </p>
            </div>

            <a
              href="#reviews"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#d4a373] hover:underline"
            >
              <span>{isAr ? 'تصفح آراء الزوار بالكامل ←' : 'Read all reviews ←'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
