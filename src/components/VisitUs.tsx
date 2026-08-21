import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Copy, Check, Calendar, Users, Utensils } from 'lucide-react';
import { Language } from '../types';
import { BRANCH_INFO } from '../data/tasaData';

interface VisitUsProps {
  lang: Language;
}

export const VisitUs: React.FC<VisitUsProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resGuests, setResGuests] = useState('2');
  const [resTime, setResTime] = useState('');
  const [resDate, setResDate] = useState('');
  const [resSuccess, setResSuccess] = useState(false);

  const isAr = lang === 'ar';

  const copyAddress = () => {
    navigator.clipboard.writeText(isAr ? BRANCH_INFO.addressAr : BRANCH_INFO.addressEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setResSuccess(true);
    setTimeout(() => {
      setResSuccess(false);
      setShowReservationModal(false);
      setResName('');
      setResPhone('');
      setResDate('');
      setResTime('');
    }, 2000);
  };

  return (
    <section id="visit-us" className="py-24 bg-[#0a0b0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b1e2a] border border-[#d4a373]/30 text-[#d4a373] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isAr ? 'موقعنا واستقبالكم' : 'Visit & Contact'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 font-['Alexandria']">
            {isAr ? (
              <>
                جاهز تجرب طعم مختلف؟ <br className="hidden sm:block" />
                <span className="copper-gradient-text">زور طاسه جملي اليوم في شيراتون</span>
              </>
            ) : (
              <>
                Ready for a Distinct Taste? <br className="hidden sm:block" />
                <span className="copper-gradient-text">Visit Tasa Gamali in Sheraton Today</span>
              </>
            )}
          </h2>

          <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'نرحب بكم يومياً في صالتنا المكيفة أو لطلبات التيك أواي والتوصيل حتى ساعات الفجر.'
              : 'Join us at our welcoming Sheraton location or order delivery until early dawn.'}
          </p>
        </div>

        {/* 2-Column Info & Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Branch Details Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Address Box */}
            <div className="bg-[#12141d] border border-[#222636] rounded-2xl p-6 relative">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1d2130] border border-[#2d3448] flex items-center justify-center text-[#d4a373] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1 font-['Alexandria']">
                    {isAr ? 'العنوان والموقع' : 'Location Address'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#c0c5d0] leading-relaxed mb-3">
                    {isAr ? BRANCH_INFO.addressAr : BRANCH_INFO.addressEn}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyAddress}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1d2a] hover:bg-[#23283a] text-[#d4a373] text-xs font-semibold border border-[#2f354a] transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ لـ Uber / Taxi' : 'Copy for Uber')}</span>
                    </button>

                    <a
                      href={BRANCH_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d4a373] text-[#0b0c10] text-xs font-bold hover:bg-[#c49258] transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{isAr ? 'الاتجاهات' : 'Get Directions'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone & Direct Orders */}
            <div className="bg-[#12141d] border border-[#222636] rounded-2xl p-6">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1d2130] border border-[#2d3448] flex items-center justify-center text-[#d4a373] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1 font-['Alexandria']">
                    {isAr ? 'أرقام الهاتف والطلبات' : 'Direct Phone & Orders'}
                  </h3>
                  <div className="text-xl sm:text-2xl font-black text-[#d4a373] font-mono mb-3">
                    {BRANCH_INFO.formattedPhone}
                  </div>
                  <a
                    href={`tel:${BRANCH_INFO.phone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4a373] hover:bg-[#c49258] text-[#0b0c10] text-xs sm:text-sm font-bold shadow-md shadow-[#d4a373]/15 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{isAr ? 'اتصل الآن مباشرة' : 'Call Directly Now'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-[#12141d] border border-[#222636] rounded-2xl p-6">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1d2130] border border-[#2d3448] flex items-center justify-center text-[#d4a373] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1 font-['Alexandria']">
                    {isAr ? 'مواعيد العمل اليومية' : 'Operating Hours'}
                  </h3>
                  <p className="text-sm font-semibold text-white mb-1">
                    {isAr ? BRANCH_INFO.hoursAr : BRANCH_INFO.hoursEn}
                  </p>
                  <span className="inline-block text-[11px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                    {isAr ? '• مفتوح يومياً لخدمتكم' : '• Open 7 Days a Week'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual & Quick Booking (7 cols) */}
          <div className="lg:col-span-7 bg-[#12141d] border border-[#222636] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-['Alexandria'] mb-1">
                    {isAr ? 'موقع الفرع على الخريطة' : 'Sheraton Heliopolis Location'}
                  </h3>
                  <p className="text-xs text-[#9ca3af]">
                    {isAr ? 'سهولة الوصول ومواقف سيارات متوفرة' : 'Easy access & parking availability'}
                  </p>
                </div>

                <button
                  onClick={() => setShowReservationModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#1d2232] border border-[#d4a373]/40 text-[#d4a373] hover:bg-[#d4a373] hover:text-[#0b0c10] transition-colors text-xs font-bold cursor-pointer"
                >
                  {isAr ? 'حجز طاولة مسبقاً' : 'Book a Table'}
                </button>
              </div>

              {/* Map Preview Frame */}
              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#2b3144] relative bg-[#181a24]">
                <iframe
                  title="Tasa Gamali Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.9868779679057!2d31.3767!3d30.1068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458160a2b7201b1%3A0x6b4f7e2a9b3c4a22!2sSaqr%20Quraysh%2C%20Sheraton%20Al%20Matar%2C%20El%20Nozha%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1699999999999!5m2!1sen!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Quick Actions Footer inside card */}
            <div className="mt-6 pt-6 border-t border-[#1f2332] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={BRANCH_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1c202d] hover:bg-[#252a3c] border border-[#2f354a] text-white text-xs font-bold transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#d4a373]" />
                <span>{isAr ? 'فتح الخريطة في تطبيق Google Maps' : 'Open in Google Maps App'}</span>
              </a>

              <a
                href={`tel:${BRANCH_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#d4a373] hover:bg-[#c49258] text-[#0b0c10] text-xs font-bold transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{isAr ? 'طلب أوردر تيك أواي أو دليفري' : 'Order Takeaway / Delivery'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Table Reservation Modal */}
        {showReservationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#12141e] border border-[#2c3246] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setShowReservationModal(false)}
                className="absolute top-4 left-4 sm:left-auto sm:right-4 text-[#8e95a5] hover:text-white p-1"
              >
                ✕
              </button>

              <h3 className="text-lg font-bold text-white mb-1 font-['Alexandria']">
                {isAr ? 'حجز طاولة في طاسه جملي' : 'Table Reservation'}
              </h3>
              <p className="text-xs text-[#8e95a5] mb-4">
                {isAr ? 'يسعدنا تجهيز طاولتك الساخنة قبل وصولك' : 'We will prepare your table before arrival'}
              </p>

              {resSuccess ? (
                <div className="text-center py-8">
                  <Check className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                  <div className="text-base font-bold text-white mb-1">
                    {isAr ? 'تم استلام طلب الحجز بنجاح!' : 'Reservation Requested!'}
                  </div>
                  <div className="text-xs text-[#8e95a5]">
                    {isAr ? 'سيتواصل معك فريق الاستقبال لتأكيد الحجز فوراً.' : 'Our team will contact you shortly to confirm.'}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReservation} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#c0c5d0] block mb-1">
                      {isAr ? 'الاسم بالكامل:' : 'Full Name:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      placeholder={isAr ? 'الاسم الكريم' : 'Name'}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#161924] border border-[#2a2f42] text-white text-sm focus:outline-none focus:border-[#d4a373]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#c0c5d0] block mb-1">
                      {isAr ? 'رقم الهاتف:' : 'Phone Number:'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={resPhone}
                      onChange={(e) => setResPhone(e.target.value)}
                      placeholder="01100054000"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#161924] border border-[#2a2f42] text-white text-sm focus:outline-none focus:border-[#d4a373]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#c0c5d0] block mb-1">
                        {isAr ? 'عدد الأفراد:' : 'Guests:'}
                      </label>
                      <select
                        value={resGuests}
                        onChange={(e) => setResGuests(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#161924] border border-[#2a2f42] text-white text-sm focus:outline-none focus:border-[#d4a373]"
                      >
                        <option value="1">1 {isAr ? 'فرد' : 'Person'}</option>
                        <option value="2">2 {isAr ? 'أفراد' : 'Guests'}</option>
                        <option value="4">4 {isAr ? 'أفراد' : 'Guests'}</option>
                        <option value="6">6 {isAr ? 'أفراد' : 'Guests'}</option>
                        <option value="8+">8+ {isAr ? 'عزومة / عائلة' : 'Family/Group'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#c0c5d0] block mb-1">
                        {isAr ? 'الوقت التقريبي:' : 'Estimated Time:'}
                      </label>
                      <input
                        type="time"
                        required
                        value={resTime}
                        onChange={(e) => setResTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#161924] border border-[#2a2f42] text-white text-sm focus:outline-none focus:border-[#d4a373]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#d4a373] text-[#0b0c10] font-bold text-sm hover:bg-[#c49258] transition-colors cursor-pointer"
                  >
                    {isAr ? 'تأكيد إرسال الحجز' : 'Confirm Table Booking'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
