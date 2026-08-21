import React, { useState } from 'react';
import { Search, Flame, Plus, Check, Star, Sparkles, Filter, Info } from 'lucide-react';
import { Language, MenuItem, SpiceLevel } from '../types';
import { MENU_ITEMS } from '../data/tasaData';

interface MenuSectionProps {
  lang: Language;
  onAddToCart: (item: MenuItem, portionIndex?: number, spiceLevel?: SpiceLevel) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ lang, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpice, setSelectedSpice] = useState<Record<string, SpiceLevel>>({});
  const [selectedPortion, setSelectedPortion] = useState<Record<string, number>>({});
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);

  const isAr = lang === 'ar';

  const categories = [
    { id: 'all', nameAr: 'كل الأطباق', nameEn: 'All Dishes' },
    { id: 'skillets', nameAr: 'طاسات جملي الفاخرة', nameEn: 'Signature Skillets' },
    { id: 'grills', nameAr: 'مشويات على الفحم', nameEn: 'Charcoal Grills' },
    { id: 'sandwiches', nameAr: 'ساندوتشات وحواوشي', nameEn: 'Sandwiches & Hawawshi' },
    { id: 'claypots', nameAr: 'طواجن فخار بالفرن', nameEn: 'Egyptian Clay Pots' },
    { id: 'sides', nameAr: 'مقبلات وسلطات', nameEn: 'Sides & Salads' },
    { id: 'drinks', nameAr: 'مشروبات وعصائر', nameEn: 'Drinks & Coolers' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      item.nameAr.toLowerCase().includes(query) ||
      item.nameEn.toLowerCase().includes(query) ||
      item.descriptionAr.toLowerCase().includes(query) ||
      item.descriptionEn.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = (item: MenuItem) => {
    const portionIdx = selectedPortion[item.id] || 0;
    const spice = selectedSpice[item.id] || 'medium';
    onAddToCart(item, portionIdx, spice);

    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const handlePortionChange = (itemId: string, index: number) => {
    setSelectedPortion((prev) => ({ ...prev, [itemId]: index }));
  };

  const handleSpiceChange = (itemId: string, spice: SpiceLevel) => {
    setSelectedSpice((prev) => ({ ...prev, [itemId]: spice }));
  };

  return (
    <section id="menu" className="py-24 bg-[#0a0b0f] border-b border-[#202330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181a24] border border-[#d4a373]/30 text-[#d4a373] text-xs font-bold uppercase tracking-wider mb-3">
            <span>{isAr ? 'قائمة المأكولات' : 'Culinary Menu'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 font-['Alexandria']">
            {isAr ? (
              <>
                قائمة أطباق <span className="copper-gradient-text">طاسه جملي</span>
              </>
            ) : (
              <>
                Our Signature <span className="copper-gradient-text">Menu Selection</span>
              </>
            )}
          </h2>

          <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'تشكيلة مختارة من أشهى أطباق اللحم والكبدة الجملي البلدي، مشوية ومحمرة بأعلى معايير النظافة والجودة.'
              : 'Handcrafted camel liver skillets, charcoal grills, crispy hawawshi, and traditional clay pots.'}
          </p>
        </div>

        {/* Search Bar & Filters */}
        <div className="max-w-xl mx-auto mb-8 relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#9ca3af] absolute right-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن طبق، كبدة، سجق، حواوشي...' : 'Search dishes, liver, grills, hawawshi...'}
              className="w-full pr-11 pl-4 py-3 rounded-xl bg-[#12141c] border border-[#262a3a] text-white placeholder-[#6b7280] text-sm focus:outline-none focus:border-[#d4a373] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 text-xs text-[#9ca3af] hover:text-white px-2 py-1"
              >
                {isAr ? 'مسح' : 'Clear'}
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Single line with horizontal scroll on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                activeCategory === cat.id
                  ? 'bg-[#d4a373] text-[#0b0c10] border-[#d4a373] shadow-md shadow-[#d4a373]/15'
                  : 'bg-[#12141c] text-[#9ca3af] border-[#222634] hover:border-[#353b50] hover:text-white'
              }`}
            >
              {isAr ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#11131b] rounded-2xl border border-[#202434] max-w-md mx-auto">
            <Filter className="w-8 h-8 text-[#6b7280] mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              {isAr ? 'لم نجد أطباق مطابقة لبحثك' : 'No matching dishes found'}
            </h3>
            <p className="text-xs text-[#9ca3af] mb-4">
              {isAr ? 'جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً.' : 'Try a different search term or category.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-lg bg-[#d4a373] text-[#0b0c10] text-xs font-bold"
            >
              {isAr ? 'عرض كل الأطباق' : 'View All Dishes'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const portionIdx = selectedPortion[item.id] || 0;
              const currentPrice = item.portionOptions
                ? item.portionOptions[portionIdx].price
                : item.price;
              const isAdded = addedItemIds[item.id];
              const itemSpice = selectedSpice[item.id] || 'medium';

              return (
                <div
                  key={item.id}
                  className="bg-[#12141d] border border-[#222636] hover:border-[#d4a373]/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-black/50"
                >
                  <div>
                    {/* Tags and Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {item.tagAr ? (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#1d212f] text-[#d4a373] border border-[#2d3348]">
                          {isAr ? item.tagAr : item.tagEn}
                        </span>
                      ) : (
                        <span />
                      )}

                      {item.isSignature && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#e5a93c]">
                          <Star className="w-3 h-3 fill-[#e5a93c]" />
                          <span>{isAr ? 'توقيع المحل' : 'Signature'}</span>
                        </span>
                      )}
                    </div>

                    {/* Dish Title */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-white font-['Alexandria'] group-hover:text-[#d4a373] transition-colors">
                        {isAr ? item.nameAr : item.nameEn}
                      </h3>
                      <button
                        onClick={() => setActiveModalItem(item)}
                        className="text-[#6b7280] hover:text-[#d4a373] p-1 cursor-pointer"
                        title={isAr ? 'تفاصيل الطبق والمكونات' : 'Dish Info'}
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Dish Description */}
                    <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4 line-clamp-3">
                      {isAr ? item.descriptionAr : item.descriptionEn}
                    </p>

                    {/* Portion Options if available */}
                    {item.portionOptions && item.portionOptions.length > 0 && (
                      <div className="mb-4">
                        <div className="text-[11px] font-bold text-[#6b7280] mb-1.5">
                          {isAr ? 'الحجم / الوزن:' : 'Size / Weight:'}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.portionOptions.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handlePortionChange(item.id, optIdx)}
                              className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                                portionIdx === optIdx
                                  ? 'bg-[#d4a373]/15 border-[#d4a373] text-[#d4a373]'
                                  : 'bg-[#171a24] border-[#25293a] text-[#8e95a5] hover:border-[#373e56]'
                              }`}
                            >
                              {isAr ? opt.nameAr : opt.nameEn}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Spice selector for skillets / sandwiches */}
                    {item.spicyAvailable && (
                      <div className="mb-4 flex items-center justify-between gap-2 p-2 rounded-lg bg-[#161822] border border-[#242838]">
                        <span className="text-[11px] font-semibold text-[#8e95a5] flex items-center gap-1">
                          <Flame className="w-3 h-3 text-[#e53e3e]" />
                          <span>{isAr ? 'الشطة:' : 'Spice:'}</span>
                        </span>
                        <div className="flex gap-1">
                          {(['mild', 'medium', 'spicy'] as SpiceLevel[]).map((sp) => (
                            <button
                              key={sp}
                              onClick={() => handleSpiceChange(item.id, sp)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                itemSpice === sp
                                  ? 'bg-[#e53e3e] text-white'
                                  : 'bg-[#1e2230] text-[#8e95a5] hover:text-white'
                              }`}
                            >
                              {sp === 'mild' ? (isAr ? 'بارد' : 'Mild') : sp === 'medium' ? (isAr ? 'وسط' : 'Med') : (isAr ? 'حامي' : 'Hot')}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price and Add to Order Button */}
                  <div className="pt-4 border-t border-[#1c202d] flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-[#6b7280]">{isAr ? 'السعر' : 'Price'}</div>
                      <div className="text-lg sm:text-xl font-black text-[#d4a373] font-['Alexandria']">
                        {currentPrice} <span className="text-xs text-[#9ca3af] font-normal">{isAr ? 'ج.م' : 'EGP'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddItem(item)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#d4a373] hover:bg-[#c49258] text-[#0b0c10] shadow-[#d4a373]/15'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{isAr ? 'تمت الإضافة' : 'Added'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>{isAr ? 'أضف للطلب' : 'Add to Order'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dish Detail Modal */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#12141e] border border-[#2b3044] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 left-4 sm:left-auto sm:right-4 text-[#9ca3af] hover:text-white p-2 rounded-lg bg-[#1c202e] text-xs font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#1f2434] text-[#d4a373]">
                  {activeModalItem.portion || (isAr ? 'طبق مميز' : 'Special Dish')}
                </span>
                {activeModalItem.prepTime && (
                  <span className="text-xs text-[#9ca3af]">
                    ⏱ {activeModalItem.prepTime}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-black text-white mb-2 font-['Alexandria']">
                {isAr ? activeModalItem.nameAr : activeModalItem.nameEn}
              </h3>

              <p className="text-sm text-[#c0c5d0] leading-relaxed mb-5">
                {isAr ? activeModalItem.descriptionAr : activeModalItem.descriptionEn}
              </p>

              {activeModalItem.ingredientsAr && activeModalItem.ingredientsAr.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-[#181b28] border border-[#252a3d]">
                  <div className="text-xs font-bold text-[#d4a373] mb-2 uppercase">
                    {isAr ? 'المكونات والتتبيلة:' : 'Key Ingredients:'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(isAr ? activeModalItem.ingredientsAr : activeModalItem.ingredientsEn)?.map(
                      (ing, i) => (
                        <span
                          key={i}
                          className="text-xs bg-[#11131c] text-[#d1d5db] px-2.5 py-1 rounded-md border border-[#202434]"
                        >
                          • {ing}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[#202434]">
                <div className="text-xl font-black text-[#d4a373]">
                  {activeModalItem.price} {isAr ? 'جنيه مصري' : 'EGP'}
                </div>

                <button
                  onClick={() => {
                    handleAddItem(activeModalItem);
                    setActiveModalItem(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#d4a373] hover:bg-[#c49258] text-[#0b0c10] font-bold text-sm"
                >
                  {isAr ? 'إضافة إلى سلة الطلب' : 'Add to Order'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
