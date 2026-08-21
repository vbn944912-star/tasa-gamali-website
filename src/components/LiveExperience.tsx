import React, { useState, useRef } from 'react';
import { Flame, Volume2, VolumeX, Sparkles, Check, ChevronRight, Play } from 'lucide-react';
import { Language } from '../types';

interface LiveExperienceProps {
  lang: Language;
}

export const LiveExperience: React.FC<LiveExperienceProps> = ({ lang }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSizzlingAudio, setIsSizzlingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  const isAr = lang === 'ar';

  const steps = [
    {
      step: '01',
      titleAr: 'اختيار القطعية الطازجة',
      titleEn: 'Fresh Cut Butchery Selection',
      descAr: 'ننتقي يومياً أجود قطعيات الكبدة واللحم الجملي البلدي الصغير لضمان الطراوة الفائقة وانعدام أي زفارة.',
      descEn: 'Daily hand-selection of prime young Egyptian camel liver and tenderloin cuts for supreme tenderness.',
      detailAr: 'دبح اليوم 100% بلدي',
      detailEn: '100% Daily Egyptian Sourced',
    },
    {
      step: '02',
      titleAr: 'التقطيع والتتبيل المباشر',
      titleEn: 'Live Slicing & Fresh Seasoning',
      descAr: 'تُقطع القطعيات لشرائح متناسقة أمام عينيك وتُتبل بالثوم المفروم والبهارات الشرقية والليمون قبل النار مباشرة.',
      descEn: 'Artisanal slicing in open sight, infused instantly with fresh crushed garlic, spices, and baladi citrus.',
      detailAr: 'تتبيلة فورية بدون تخزين',
      detailEn: 'Zero pre-marinated storage',
    },
    {
      step: '03',
      titleAr: 'طشة الصاج والنار العالية',
      titleEn: 'The High-Heat Skillet Sizzle',
      descAr: 'تنزيل اللحم على الصاج الساخن مع قطعة لية بلدي تذوب، لتنطلق رائحة الطشة المميزة في أرجاء المكان.',
      descEn: 'Flash-seared in blistering iron pans with rendered fat, unlocking deep smoky caramelization.',
      detailAr: 'حرارة تفوق 250 درجة مئوية',
      detailEn: 'Blistering 250°C Sear',
    },
    {
      step: '04',
      titleAr: 'التقديم يغلي على طاولتك',
      titleEn: 'Bubbling Hot Table Service',
      descAr: 'تصلك الطاسة وهي بتكتك وتغلي مع العيش البلدي الطازج المنفوخ وسلطة الطحينة والباذنجان المخلل.',
      descEn: 'Served sizzling hot in seconds, paired with warm oven-baked bread and velvety sesame dips.',
      detailAr: 'من الصاج لمائدتك في ثوانٍ',
      detailEn: 'Direct pan-to-table delivery',
    },
  ];

  // Synthesize realistic sizzling sound using Web Audio API for sensory delight
  const toggleSizzleSound = () => {
    if (isSizzlingAudio) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsSizzlingAudio(false);
    } else {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        audioContextRef.current = ctx;

        // Generate Pink/Brown Noise filtered to simulate oil sizzling in skillet
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Bandpass Filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1800;
        filter.Q.value = 1.2;

        // Gain node
        const gain = ctx.createGain();
        gain.gain.value = 0.25;

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        whiteNoise.start(0);
        noiseNodeRef.current = whiteNoise;
        setIsSizzlingAudio(true);
      } catch {
        setIsSizzlingAudio(false);
      }
    }
  };

  return (
    <section id="experience" className="py-24 bg-[#0d0e13] border-b border-[#202330] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b1e2a] border border-[#d4a373]/30 text-[#d4a373] text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-[#e5a93c]" />
            <span>{isAr ? 'تجربة التحضير الحي' : 'The Sizzle Craft'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 font-['Alexandria']">
            {isAr ? (
              <>
                من أول قطعة... <span className="copper-gradient-text">لحد آخر لقمة.</span>
              </>
            ) : (
              <>
                From the First Cut... <span className="copper-gradient-text">To the Last Bite.</span>
              </>
            )}
          </h2>

          <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'في طاسه جملي، الأكل مش مجرد وجبة بتطلبها... دي تجربة بصرية وحسية متكاملة بتبدأ من لحظة دخولك المطعم.'
              : 'At Tasa Gamali, dining is an immersive sensory performance witnessed from butchery block to blistering iron.'}
          </p>

          {/* Sizzle Sound Trigger Button */}
          <div className="mt-5 flex items-center justify-center">
            <button
              onClick={toggleSizzleSound}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                isSizzlingAudio
                  ? 'bg-[#e5a93c] text-[#0b0c10] border-[#e5a93c] animate-pulse'
                  : 'bg-[#181a24] text-[#d4a373] border-[#2f3548] hover:border-[#d4a373]'
              }`}
            >
              {isSizzlingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>
                {isSizzlingAudio
                  ? (isAr ? 'إيقاف صوت طشة الطاسة' : 'Mute Skillet Sizzle')
                  : (isAr ? '🔊 استمع لصوت طشة الطاسة الساخنة' : '🔊 Listen to Sizzling Pan Sound')}
              </span>
            </button>
          </div>
        </div>

        {/* 2-Column Experience Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Step Selector & Details (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeStep === idx
                    ? 'bg-[#161924] border-[#d4a373] shadow-lg shadow-[#d4a373]/10'
                    : 'bg-[#11131b] border-[#202434] hover:border-[#2f3548]'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-md font-mono ${
                        activeStep === idx
                          ? 'bg-[#d4a373] text-[#0b0c10]'
                          : 'bg-[#1c202c] text-[#9ca3af]'
                      }`}
                    >
                      {item.step}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white font-['Alexandria']">
                      {isAr ? item.titleAr : item.titleEn}
                    </h3>
                  </div>

                  <span className="text-[11px] font-semibold text-[#d4a373] bg-[#1a1d28] px-2.5 py-1 rounded-md border border-[#2b3042] whitespace-nowrap">
                    {isAr ? item.detailAr : item.detailEn}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed pr-8 sm:pr-10">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Visual Showcase (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#2c3144] shadow-2xl">
              <img
                src="/src/assets/images/camel_grill_platter_1787311236850.jpg"
                alt="مشويات وطاسات جملي شيراتون"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-70" />

              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#11131b]/95 backdrop-blur-md border border-[#2c3144] rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#d4a373] text-[#0b0c10] flex items-center justify-center font-black">
                    🥩
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white font-['Alexandria']">
                      {isAr ? 'مطبخ مفتوح وطهي مباشر 100%' : '100% Open Kitchen & Live Seared'}
                    </h4>
                    <p className="text-xs text-[#9ca3af]">
                      {isAr ? 'شاهد الشيف وهو يحضر طلبك لحظة بلحظة' : 'Watch our master chefs fire up your meal live'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
