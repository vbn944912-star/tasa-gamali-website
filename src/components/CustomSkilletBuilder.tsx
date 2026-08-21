import React, { useState } from 'react';
import { Flame, Sparkles, Plus, Check, RotateCcw } from 'lucide-react';
import { Language, MenuItem, SpiceLevel } from '../types';

interface CustomSkilletBuilderProps {
  lang: Language;
  onAddToCart: (customItem: MenuItem, portionIndex?: number, spiceLevel?: SpiceLevel) => void;
}

export const CustomSkilletBuilder: React.FC<CustomSkilletBuilderProps> = ({
  lang,
  onAddToCart,
}) => {
  const isAr = lang === 'ar';

  const [selectedMeats, setSelectedMeats] = useState<string[]>(['liver']);
  const [selectedSize, setSelectedSize] = useState<'single' | 'double' | 'family'>('single');
  const [selectedStyle, setSelectedStyle] = useState<string>('alexandrian');
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>('medium');
  const [selectedSides, setSelectedSides] = useState<string[]>(['tahini', 'bread']);
  const [added, setAdded] = useState(false);

  const meatOptions = [
    { id: 'liver', nameAr: 'كبدة جملي طازجة', nameEn: 'Fresh Camel Liver', basePrice: 195 },
    { id: 'sausage', nameAr: 'سجق جملي بيتي متبل', nameEn: 'Spiced Camel Sausage', basePrice: 180 },
    { id: 'tenderloin', nameAr: 'لحم جملي هبر صافي', nameEn: 'Camel Tenderloin Bites', basePrice: 210 },
    { id: 'kidneys', nameAr: 'كلاوي وقلب جملي', nameEn: 'Camel Kidneys & Heart', basePrice: 190 },
  ];

  const sizeOptions = [
    { id: 'single', nameAr: 'فردي (ربع كيلو)', nameEn: 'Single (250g)', multiplier: 1.0 },
    { id: 'double', nameAr: 'دبل (نصف كيلو)', nameEn: 'Double (500g)', multiplier: 1.85 },
    { id: 'family', nameAr: 'ملكي عائلي (1 كيلو)', nameEn: 'Royal (1kg)', multiplier: 3.4 },
  ];

  const cookingStyles = [
    {
      id: 'alexandrian',
      nameAr: 'طشة إسكندراني بالثوم والليمون والفلفل',
      nameEn: 'Alexandrian Garlic, Lime & Pepper Sear',
      descAr: 'الكلاسيكية الأكثر طلباً برائحة الثوم وطشة الخل',
      descEn: 'The classic sear with minced garlic and vinegar splash',
    },
    {
      id: 'spicy_leya',
      nameAr: 'طشة لية وسمن بلدي مع فلفل حار',
      nameEn: 'Baladi Leya & Extra Chili Sear',
      descAr: 'غنية ودسمة بطعم اللية البلدي والنار الحامية',
      descEn: 'Rich rendered fat with fiery green chili kick',
    },
    {
      id: 'pomegranate',
      nameAr: 'تتبيلة دبس الرمان المكرمل والسمسم',
      nameEn: 'Caramelized Pomegranate & Sesame',
      descAr: 'مزيج حلو وحامض مكرمل على الصاج',
      descEn: 'Sweet and tangy reduction with toasted seeds',
    },
  ];

  const sideOptions = [
    { id: 'tahini', nameAr: 'طحينة سمسم بلدي', nameEn: 'Baladi Tahini Dip', price: 0 },
    { id: 'bread', nameAr: 'عيش بلدي سخن (4 أرغفة)', nameEn: 'Warm Baladi Bread (4 pcs)', price: 0 },
    { id: 'eggplant', nameAr: 'باذنجان مخلل بالدقة', nameEn: 'Garlic Pickled Aubergine', price: 20 },
    { id: 'pickles', nameAr: 'مخلل طاسه جملي مشكل', nameEn: 'Assorted Pickles', price: 15 },
  ];

  const toggleMeat = (id: string) => {
    if (selectedMeats.includes(id)) {
      if (selectedMeats.length > 1) {
        setSelectedMeats(selectedMeats.filter((m) => m !== id));
      }
    } else {
      setSelectedMeats([...selectedMeats, id]);
    }
  };

  const toggleSide = (id: string) => {
    if (selectedSides.includes(id)) {
      setSelectedSides(selectedSides.filter((s) => s !== id));
    } else {
      setSelectedSides([...selectedSides, id]);
    }
  };

  // Calculate Price
  const highestMeatBase = Math.max(
    ...selectedMeats.map((m) => meatOptions.find((o) => o.id === m)?.basePrice || 190)
  );
  const mixSurcharge = selectedMeats.length > 1 ? (selectedMeats.length - 1) * 20 : 0;
  const sizeMultiplier = sizeOptions.find((s) => s.id === selectedSize)?.multiplier || 1;
  const sidesCost = selectedSides.reduce((acc, sideId) => {
    const s = sideOptions.find((o) => o.id === sideId);
    return acc + (s?.price || 0);
  }, 0);

  const calculatedTotal = Math.round((highestMeatBase + mixSurcharge) * sizeMultiplier) + sidesCost;

  const handleCreateAndAdd = () => {
    const meatNamesAr = selectedMeats
      .map((m) => meatOptions.find((o) => o.id === m)?.nameAr)
      .join(' + ');
    const meatNamesEn = selectedMeats
      .map((m) => meatOptions.find((o) => o.id === m)?.nameEn)
      .join(' + ');

    const styleObj = cookingStyles.find((s) => s.id === selectedStyle);

    const customSkilletItem: MenuItem = {
      id: `custom-skillet-${Date.now()}`,
      nameAr: `طاسة جملي خاصة على مزاجك (${meatNamesAr})`,
      nameEn: `Custom Skillet (${meatNamesEn})`,
      descriptionAr: `طاسة مخصصة: ${meatNamesAr} بتتبيلة ${styleObj?.nameAr}. الحجم: ${
        sizeOptions.find((s) => s.id === selectedSize)?.nameAr
      }.`,
      descriptionEn: `Custom skillet with ${meatNamesEn} cooked in ${styleObj?.nameEn}. Size: ${
        sizeOptions.find((s) => s.id === selectedSize)?.nameEn
      }.`,
      price: calculatedTotal,
      category: 'skillets',
      tagAr: 'طاسة مخصوصة',
      tagEn: 'Custom Build',
      spicyAvailable: true,
    };

    onAddToCart(customSkilletItem, 0, selectedSpice);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReset = () => {
    setSelectedMeats(['liver']);
    setSelectedSize('single');
    setSelectedStyle('alexandrian');
    setSelectedSpice('medium');
    setSelectedSides(['tahini', 'bread']);
  };

  return (
    <section className="py-20 bg-[#0d0f15] border-b border-[#202330] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12141d] border border-[#2c3246] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle decoration badge */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#d4a373] text-[#0b0c10] flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                  {isAr ? 'اصنع طاستك الجملي على مزاجك' : 'Build Your Custom Camel Skillet'}
                </h2>
                <p className="text-xs text-[#9ca3af]">
                  {isAr
                    ? 'اختر قطعيات اللحم، الحجم، نوع الطشة، ودرجة الشطة المفضلة لديك'
                    : 'Select cuts, skillet size, cooking style, and spice level'}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-semibold text-[#8e95a5] hover:text-[#d4a373] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isAr ? 'إعادة ضبط' : 'Reset'}</span>
            </button>
          </div>

          <div className="space-y-8">
            {/* Step 1: Meats */}
            <div>
              <div className="text-xs font-bold text-[#d4a373] mb-3 uppercase tracking-wider">
                {isAr ? '1. اختر نوع اللحم أو ادمج أكثر من صنف (ميكس):' : '1. Select meat cuts (combine for mix):'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {meatOptions.map((meat) => {
                  const isSelected = selectedMeats.includes(meat.id);
                  return (
                    <button
                      key={meat.id}
                      onClick={() => toggleMeat(meat.id)}
                      className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#d4a373]/15 border-[#d4a373] text-white shadow-md'
                          : 'bg-[#161822] border-[#252a3a] text-[#9ca3af] hover:border-[#353b50]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-white">
                          {isAr ? meat.nameAr : meat.nameEn}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#d4a373]" />}
                      </div>
                      <span className="text-[11px] text-[#d4a373]">
                        {isAr ? `أساسي ${meat.basePrice} ج.م` : `From ${meat.basePrice} EGP`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Size */}
            <div>
              <div className="text-xs font-bold text-[#d4a373] mb-3 uppercase tracking-wider">
                {isAr ? '2. اختر حجم الطاسة:' : '2. Choose Skillet Size:'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sizeOptions.map((size) => {
                  const isSelected = selectedSize === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id as 'single' | 'double' | 'family')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#d4a373]/15 border-[#d4a373] text-white font-bold'
                          : 'bg-[#161822] border-[#252a3a] text-[#9ca3af] hover:border-[#353b50]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm block text-white font-bold">
                        {isAr ? size.nameAr : size.nameEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Cooking Style */}
            <div>
              <div className="text-xs font-bold text-[#d4a373] mb-3 uppercase tracking-wider">
                {isAr ? '3. طريقة الطشة والنكهة:' : '3. Skillet Sizzle Style:'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {cookingStyles.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#d4a373]/15 border-[#d4a373] text-white'
                          : 'bg-[#161822] border-[#252a3a] text-[#9ca3af] hover:border-[#353b50]'
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-1">
                        {isAr ? style.nameAr : style.nameEn}
                      </div>
                      <div className="text-[11px] text-[#8e95a5]">
                        {isAr ? style.descAr : style.descEn}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Spice & Sides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <div className="text-xs font-bold text-[#d4a373] mb-2.5 uppercase tracking-wider">
                  {isAr ? '4. درجة الشطة والفلفل:' : '4. Spice Level:'}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'mild' as SpiceLevel, labelAr: 'بارد', labelEn: 'Mild' },
                    { key: 'medium' as SpiceLevel, labelAr: 'وسط', labelEn: 'Medium' },
                    { key: 'spicy' as SpiceLevel, labelAr: 'حامي نار', labelEn: 'Extra Hot' },
                  ].map((sp) => (
                    <button
                      key={sp.key}
                      onClick={() => setSelectedSpice(sp.key)}
                      className={`py-2 px-2 rounded-lg border text-xs font-semibold text-center cursor-pointer ${
                        selectedSpice === sp.key
                          ? 'bg-[#2a1b1b] border-[#e53e3e] text-white'
                          : 'bg-[#161822] border-[#252a3a] text-[#9ca3af]'
                      }`}
                    >
                      {isAr ? sp.labelAr : sp.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-[#d4a373] mb-2.5 uppercase tracking-wider">
                  {isAr ? '5. المقبلات مع الطاسة:' : '5. Included & Add-on Sides:'}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {sideOptions.map((side) => {
                    const isSelected = selectedSides.includes(side.id);
                    return (
                      <button
                        key={side.id}
                        onClick={() => toggleSide(side.id)}
                        className={`p-2 rounded-lg border text-xs text-right flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#1d2232] border-[#d4a373] text-white'
                            : 'bg-[#161822] border-[#252a3a] text-[#8e95a5]'
                        }`}
                      >
                        <span className="truncate">{isAr ? side.nameAr : side.nameEn}</span>
                        {side.price > 0 && (
                          <span className="text-[10px] text-[#d4a373] shrink-0 font-bold mr-1">
                            +{side.price}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Summary Bar */}
            <div className="pt-6 border-t border-[#232838] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#8e95a5] mb-0.5">
                  {isAr ? 'السعر المحسوب للطاسة المخصصة' : 'Total Custom Price'}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#d4a373] font-['Alexandria']">
                  {calculatedTotal} <span className="text-sm font-normal text-[#9ca3af]">{isAr ? 'جنيه مصري' : 'EGP'}</span>
                </div>
              </div>

              <button
                onClick={handleCreateAndAdd}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-lg ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#d4a373] hover:bg-[#c49258] text-[#0b0c10] shadow-[#d4a373]/20'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>{isAr ? 'تمت إضافة طاستك للطلب!' : 'Custom Skillet Added!'}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>{isAr ? 'أضف هذه الطاسة لسلة طلباتي' : 'Add Custom Skillet to Order'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
