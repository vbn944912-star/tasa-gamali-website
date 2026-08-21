import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, Phone, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { CartItem, Language } from '../types';
import { BRANCH_INFO } from '../data/tasaData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  lang,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dinein'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const isAr = lang === 'ar';

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => {
    const itemPrice = item.selectedPortion
      ? item.selectedPortion.price
      : item.menuItem.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const formatWhatsAppOrder = () => {
    let text = `*طلب جديد من موقع طاسه جملي 🥩*\n\n`;
    text += `*نوع الطلب:* ${
      orderType === 'delivery'
        ? 'توصيل دليفري 🛵'
        : orderType === 'pickup'
        ? 'استلام من الفرع 🛍️'
        : 'تناول في الصالة 🍽️'
    }\n`;

    if (customerName) text += `*الاسم:* ${customerName}\n`;
    if (orderType === 'delivery' && customerAddress) {
      text += `*عنوان التوصيل:* ${customerAddress}\n`;
    }
    if (customerNotes) text += `*ملاحظات خاصة:* ${customerNotes}\n`;

    text += `\n*الأطباق المطلوبة:*\n`;
    items.forEach((item, i) => {
      const portionText = item.selectedPortion ? ` (${item.selectedPortion.nameAr})` : '';
      const spiceText =
        item.spiceLevel === 'mild'
          ? ' [بارد]'
          : item.spiceLevel === 'spicy'
          ? ' [حامي نار]'
          : ' [وسط]';
      const itemPrice = (item.selectedPortion ? item.selectedPortion.price : item.menuItem.price) * item.quantity;

      text += `${i + 1}. *${item.menuItem.nameAr}*${portionText}${spiceText}\n   العدد: ${item.quantity} × السعر: ${itemPrice} ج.م\n`;
    });

    text += `\n*الإجمالي:* ${totalAmount} جنيه مصري\n`;
    text += `*الفرع:* مساكن شيراتون - القاهرة\n`;
    text += `شكراً لكم!`;

    const encoded = encodeURIComponent(text);
    // Egyptian phone for WhatsApp
    const waUrl = `https://wa.me/201100054000?text=${encoded}`;
    window.open(waUrl, '_blank');
    setSentSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div className="w-screen max-w-md bg-[#10121a] border-l rtl:border-l-0 rtl:border-r border-[#262c3e] shadow-2xl flex flex-col justify-between">
          {/* Cart Header */}
          <div className="p-5 border-b border-[#202534] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#d4a373] text-[#0b0c10] flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-['Alexandria']">
                  {isAr ? 'سلة الطلبات' : 'Your Order'}
                </h3>
                <span className="text-xs text-[#8e95a5]">
                  {items.length} {isAr ? 'أصناف مختارة' : 'items'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-[#8e95a5] hover:text-[#e53e3e] px-2 py-1 cursor-pointer"
                >
                  {isAr ? 'تفريغ' : 'Clear'}
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-[#191d2a] text-[#8e95a5] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#181c28] border border-[#262d40] flex items-center justify-center mx-auto mb-4 text-[#8e95a5]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {isAr ? 'سلة طلبك فارغة حالياً' : 'Your order is empty'}
                </h4>
                <p className="text-xs text-[#8e95a5] max-w-xs mx-auto mb-6">
                  {isAr
                    ? 'اختر أشهى طاسات الكبدة واللحوم الجملي من القائمة وأضفها لطلبك.'
                    : 'Add delicious camel liver skillets and grills from our menu.'}
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#d4a373] text-[#0b0c10] text-xs font-bold"
                >
                  {isAr ? 'تصفح قائمة الطعام' : 'Browse Menu'}
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => {
                    const itemPrice = item.selectedPortion
                      ? item.selectedPortion.price
                      : item.menuItem.price;
                    return (
                      <div
                        key={item.cartId}
                        className="bg-[#141722] border border-[#222736] rounded-xl p-3.5 flex items-start justify-between gap-3"
                      >
                        <div className="flex-1">
                          <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                            {isAr ? item.menuItem.nameAr : item.menuItem.nameEn}
                          </h4>

                          <div className="flex flex-wrap gap-2 text-[10px] text-[#8e95a5] mb-2">
                            {item.selectedPortion && (
                              <span className="bg-[#1c202e] px-2 py-0.5 rounded text-[#d4a373]">
                                {isAr ? item.selectedPortion.nameAr : item.selectedPortion.nameEn}
                              </span>
                            )}
                            {item.spiceLevel && (
                              <span className="bg-[#1c202e] px-2 py-0.5 rounded">
                                {item.spiceLevel === 'mild'
                                  ? isAr ? 'بارد' : 'Mild'
                                  : item.spiceLevel === 'spicy'
                                  ? isAr ? 'حامي نار' : 'Extra Hot'
                                  : isAr ? 'وسط' : 'Medium'}
                              </span>
                            )}
                          </div>

                          <div className="text-xs font-black text-[#d4a373]">
                            {itemPrice * item.quantity} {isAr ? 'ج.م' : 'EGP'}
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1 bg-[#1a1e2c] border border-[#2b3144] rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQty(item.cartId, -1)}
                            className="p-1 text-[#8e95a5] hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.cartId, 1)}
                            className="p-1 text-[#8e95a5] hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.cartId)}
                            className="p-1 text-[#8e95a5] hover:text-red-400 ml-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Details Form */}
                <div className="pt-4 border-t border-[#202534] space-y-3">
                  <div className="text-xs font-bold text-[#d4a373] uppercase">
                    {isAr ? 'طريقة الاستلام:' : 'Order Type:'}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'delivery', labelAr: 'توصيل دليفري', labelEn: 'Delivery' },
                      { id: 'pickup', labelAr: 'استلام بالفرع', labelEn: 'Pickup' },
                      { id: 'dinein', labelAr: 'في الصالة', labelEn: 'Dine-In' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setOrderType(type.id as 'delivery' | 'pickup' | 'dinein')}
                        className={`py-2 px-1 text-center rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                          orderType === type.id
                            ? 'bg-[#d4a373]/15 border-[#d4a373] text-white'
                            : 'bg-[#151824] border-[#252a3a] text-[#8e95a5]'
                        }`}
                      >
                        {isAr ? type.labelAr : type.labelEn}
                      </button>
                    ))}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder={isAr ? 'الاسم الكريم' : 'Your Name'}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#151824] border border-[#252a3a] text-white text-xs placeholder-[#6b7280] focus:outline-none focus:border-[#d4a373]"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <input
                        type="text"
                        placeholder={isAr ? 'عنوان التوصيل بالتفصيل (في شيراتون أو المناطق المجاورة)' : 'Delivery Address'}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#151824] border border-[#252a3a] text-white text-xs placeholder-[#6b7280] focus:outline-none focus:border-[#d4a373]"
                      />
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      placeholder={isAr ? 'أي ملاحظات خاصة في التتبيلة أو الخبز؟' : 'Special instructions'}
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#151824] border border-[#252a3a] text-white text-xs placeholder-[#6b7280] focus:outline-none focus:border-[#d4a373]"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Cart Footer / Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#202534] bg-[#0c0e14] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#8e95a5]">{isAr ? 'المجموع النهائي:' : 'Subtotal:'}</span>
                <span className="text-xl font-black text-[#d4a373] font-['Alexandria']">
                  {totalAmount} {isAr ? 'جنيه مصري' : 'EGP'}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={formatWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-[#0b0c10] font-black text-sm transition-all cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'إرسال الطلب عبر واتساب للفرع' : 'Send Order via WhatsApp'}</span>
                </button>

                <a
                  href={`tel:${BRANCH_INFO.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1c202d] hover:bg-[#252a3a] border border-[#2f354a] text-white font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>{isAr ? `تأكيد الطلب هاتفياً: ${BRANCH_INFO.formattedPhone}` : `Call to Confirm: ${BRANCH_INFO.formattedPhone}`}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
