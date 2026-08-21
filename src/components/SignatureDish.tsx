import React, { useState } from 'react';
import { Star, Flame, Sparkles, Plus, Check, ShieldAlert, Heart } from 'lucide-react';
import { Language, MenuItem, SpiceLevel } from '../types';
import { MENU_ITEMS } from '../data/tasaData';

interface SignatureDishProps {
  lang: Language;
  onAddToCart: (item: MenuItem, portionIndex?: number, spiceLevel?: SpiceLevel) => void;
}

export const SignatureDish: React.FC<SignatureDishProps> = ({ lang, onAddToCart }) => {
  const [selectedPortionIdx, setSelectedPortionIdx] = useState(0);
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>('medium');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isAr = lang === 'ar';
  const signatureItem = MENU_ITEMS.find((item) => item.id === 'skillet-liver') || MENU_ITEMS[0];

  const currentPrice = signatureItem.portionOptions
    ? signatureItem.portionOptions[selectedPortionIdx].price
    : signatureItem.price;

  const handleOrder = () => {
    onAddToCart(signatureItem, selectedPortionIdx, selectedSpice);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const flavorNotes = [
    {
      titleAr: 'طراوة لا تُقاوم',
      titleEn: 'Tender & Succulent',
      descAr: 'تشويح سريع لمدة دقيقتين فقط على نار عالية ليظل قوام الكبدة جوسي وطرياً دون جفاف.',
      descEn: 'Seared for 2 minutes over intense heat to preserve maximum juiciness and melt-in-mouth texture.',
    },
    {
      titleAr: 'طشة الثوم والليمون البلدي',
      titleEn: 'Garlic & Baladi Lime Sizzle',
      descAr: 'طشة ثوم مدقوق على الصاج مع عصرة ليمون بلدي حامض تعطي لمعاناً ونكهة منعشة تفتح النفس.',
      descEn: 'Minced baladi garlic infused with freshly squeezed Egyptian lime for an irresistible aroma.',
    },
    {
      titleAr: 'اللية والتوابل السرية',
      titleEn: 'Crispy Leya & Secret Spices',
      descAr: 'لمسة من لية الجمل الذائبة مع خلطة توابل طاسه جملي الشرقية التي تميزنا عن أي مكان آخر.',
      descEn: 'A delicate touch of artisanal rendered fat and our private heritage spice blend.',
    },
  ];

  return (
    <section id="signature" className="py-24 bg-[#0a0b0f] border-b border-[#202330] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#d4a373]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e2230] border border-[#d4a373]/30 text-[#d4a373] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'الطبق الأيقوني رقم 1' : 'Signature Spotlight'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 font-['Alexandria']">
            {isAr ? (
              <>
                كبدة جملي سوبر بلدي <span className="copper-gradient-text">على الصاج الساخن</span>
              </>
            ) : (
              <>
                Signature Baladi <span className="copper-gradient-text">Camel Liver Skillet</span>
              </>
            )}
          </h2>
          <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'الطبق الأكثر طلباً وتوصية من زوارنا. تُذبح طازجة كل صباح وتُشوح على الطاسة أمامك في ثوانٍ.'
              : 'Our most celebrated masterpiece. Daily fresh liver seared to succulent perfection right before your eyes.'}
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image Showcase & Visual Proof (5 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#2d3142] shadow-2xl group">
              <img
                src="/src/assets/images/signature_camel_dish_1787311221733.jpg"
                alt="كبدة جملي طاسه جملي شيراتون"
                className="w-full h-[380px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f] via-transparent to-transparent opacity-80" />

              {/* Floating Live Badge */}
              <div className="absolute top-4 right-4 bg-[#141620]/90 backdrop-blur-md border border-[#d4a373]/40 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-lg">
                <Flame className="w-4 h-4 text-[#e5a93c] animate-pulse" />
                <span className="text-xs font-bold text-white">
                  {isAr ? 'تُحضر أمامك ساخنة في 6 دقائق' : 'Seared Live in 6 Minutes'}
                </span>
              </div>

              {/* Rating Stamp */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#11131b]/95 backdrop-blur-md border border-[#252a3a] rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#d4a373] text-[#0b0c10] font-black flex items-center justify-center text-xs">
                    4.9
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {isAr ? 'تقييم الزوار للطبق' : 'Diners Rating'}
                    </div>
                    <div className="text-[10px] text-[#9ca3af]">
                      {isAr ? 'أكثر من 340 توصية مخصصة' : '340+ specific endorsements'}
                    </div>
                  </div>
                </div>
                <div className="flex text-[#e5a93c]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#e5a93c]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details & Configurator (7 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Description and Flavor Pillars */}
            <div className="space-y-4 mb-6">
              {flavorNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#12141c] border border-[#222634]">
                  <div className="w-7 h-7 rounded-lg bg-[#1c202c] border border-[#2f3548] flex items-center justify-center text-[#d4a373] shrink-0 font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1 font-['Alexandria']">
                      {isAr ? note.titleAr : note.titleEn}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                      {isAr ? note.descAr : note.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Serving Inclusions */}
            <div className="p-4 rounded-xl bg-[#161822] border border-[#282d3e] mb-6">
              <div className="text-xs font-bold text-[#d4a373] mb-2 uppercase tracking-wider">
                {isAr ? 'يُقدم الطبق مع:' : 'Served complete with:'}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#d1d5db]">
                <div className="flex items-center gap-1.5 bg-[#0f1118] p-2 rounded-lg border border-[#202434]">
                  <Check className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>{isAr ? 'عيش بلدي سخن' : 'Baladi Bread'}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0f1118] p-2 rounded-lg border border-[#202434]">
                  <Check className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>{isAr ? 'طحينة سمسم' : 'Baladi Tahini'}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0f1118] p-2 rounded-lg border border-[#202434]">
                  <Check className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>{isAr ? 'باذنجان مخلل' : 'Pickled Eggplant'}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0f1118] p-2 rounded-lg border border-[#202434]">
                  <Check className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>{isAr ? 'ليمون معصفر' : 'Egyptian Lime'}</span>
                </div>
              </div>
            </div>

            {/* Portion Selector */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-[#9ca3af] block mb-2">
                  {isAr ? 'اختر حجم الطاسة:' : 'Choose Skillet Size:'}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {signatureItem.portionOptions?.map((portion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPortionIdx(idx)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedPortionIdx === idx
                          ? 'bg-[#d4a373]/10 border-[#d4a373] text-white shadow-md'
                          : 'bg-[#12141c] border-[#222634] text-[#9ca3af] hover:border-[#353b50]'
                      }`}
                    >
                      <div className="text-xs font-bold mb-1">
                        {isAr ? portion.nameAr : portion.nameEn}
                      </div>
                      <div className="text-sm font-black text-[#d4a373]">
                        {portion.price} {isAr ? 'ج.م' : 'EGP'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spice Level Selector */}
              <div>
                <label className="text-xs font-bold text-[#9ca3af] block mb-2">
                  {isAr ? 'درجة الشطة والفلفل:' : 'Spiciness Level:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'mild' as SpiceLevel, labelAr: 'بارد بدون شطة', labelEn: 'Mild / No Chili' },
                    { key: 'medium' as SpiceLevel, labelAr: 'وسط مظبوط', labelEn: 'Medium Spiced' },
                    { key: 'spicy' as SpiceLevel, labelAr: 'حامي نار ومولع', labelEn: 'Extra Hot' },
                  ].map((spice) => (
                    <button
                      key={spice.key}
                      onClick={() => setSelectedSpice(spice.key)}
                      className={`py-2 px-2 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                        selectedSpice === spice.key
                          ? 'bg-[#2a1d1d] border-[#e53e3e] text-white'
                          : 'bg-[#12141c] border-[#222634] text-[#9ca3af] hover:border-[#353b50]'
                      }`}
                    >
                      {isAr ? spice.labelAr : spice.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="flex items-center gap-4 pt-3">
                <div className="shrink-0">
                  <div className="text-[11px] text-[#9ca3af]">
                    {isAr ? 'السعر الإجمالي' : 'Total Price'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#d4a373] font-['Alexandria']">
                    {currentPrice} <span className="text-xs text-[#9ca3af] font-normal">{isAr ? 'جنيه مصري' : 'EGP'}</span>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-lg ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#d4a373] hover:bg-[#c49258] text-[#0b0c10] shadow-[#d4a373]/20'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>{isAr ? 'تمت الإضافة بنجاح!' : 'Added to Order!'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>{isAr ? 'أضف الطاسة لطلبك الآن' : 'Add Skillet to Order'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
