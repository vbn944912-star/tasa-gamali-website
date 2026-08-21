import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, ThumbsUp, Plus, ExternalLink } from 'lucide-react';
import { Language, ReviewItem } from '../types';
import { REVIEWS, STATS, BRANCH_INFO } from '../data/tasaData';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [filter, setFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newDish, setNewDish] = useState('طاسة كبدة جملي بلدي');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const isAr = lang === 'ar';

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `user-rev-${Date.now()}`,
      authorName: newAuthor.trim(),
      authorTitleAr: 'زائر المطعم',
      authorTitleEn: 'Diner',
      rating: newRating,
      dateAr: 'الآن',
      dateEn: 'Just now',
      commentAr: newComment.trim(),
      commentEn: newComment.trim(),
      avatarLetter: newAuthor.trim().charAt(0),
      verified: true,
      source: 'Visitor',
      highlightDishAr: newDish,
      highlightDishEn: newDish,
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setShowAddModal(false);
      setNewAuthor('');
      setNewComment('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0d0e13] border-b border-[#202330] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Rating Breakdown Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1f2c] border border-[#d4a373]/30 text-[#d4a373] text-xs font-bold uppercase tracking-wider mb-3">
              <span>{isAr ? 'تجارب وآراء الزوار' : 'Visitor Testimonials'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 font-['Alexandria']">
              {isAr ? (
                <>
                  ماذا يقول رواد <span className="copper-gradient-text">طاسه جملي؟</span>
                </>
              ) : (
                <>
                  What Our Diners Say About <span className="copper-gradient-text">Tasa Gamali</span>
                </>
              )}
            </h2>

            <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed">
              {isAr
                ? 'فخورون بثقة عملائنا في مساكن شيراتون ومحبي الكبدة الجملي من جميع محافظات مصر.'
                : 'Honored by the genuine reviews of over 484 local and visiting meat lovers.'}
            </p>
          </div>

          {/* Rating Summary Block */}
          <div className="lg:col-span-5 bg-[#131620] border border-[#262c3e] rounded-3xl p-6 sm:p-7 flex items-center justify-between gap-6 shadow-xl">
            <div className="text-center sm:text-right">
              <div className="text-4xl sm:text-5xl font-black text-white font-['Alexandria'] flex items-center justify-center sm:justify-start gap-2">
                <span>{STATS.rating}</span>
                <span className="text-sm font-normal text-[#9ca3af]">/ 5</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-[#e5a93c] my-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#e5a93c]" />
                ))}
              </div>
              <div className="text-xs text-[#9ca3af]">
                {isAr ? `بناءً على ${STATS.totalReviews} تقييم في خرائط جوجل` : `Based on ${STATS.totalReviews} Google reviews`}
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#d4a373] text-[#0b0c10] font-bold text-xs hover:bg-[#c49258] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAr ? 'أضف رأيك' : 'Write Review'}</span>
              </button>

              <a
                href={BRANCH_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#2c3246] text-[#c0c5d0] text-xs font-semibold hover:bg-[#1b1f2e] transition-colors"
              >
                <ExternalLink className="w-3 h-3 text-[#d4a373]" />
                <span>{isAr ? 'جوجل مابس' : 'Google Maps'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="bg-[#12141d] border border-[#222636] hover:border-[#d4a373]/30 rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d4a373]/30 to-[#1e2230] border border-[#d4a373]/30 flex items-center justify-center text-white font-black text-sm">
                      {review.avatarLetter}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm sm:text-base font-bold text-white font-['Alexandria']">
                          {review.authorName}
                        </h4>
                        {review.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#d4a373]" />
                        )}
                      </div>
                      <div className="text-xs text-[#8e95a5]">
                        {isAr ? review.authorTitleAr : review.authorTitleEn} • {isAr ? review.dateAr : review.dateEn}
                      </div>
                    </div>
                  </div>

                  <div className="flex text-[#e5a93c]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#e5a93c]" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#c0c5d0] leading-relaxed mb-4">
                  "{isAr ? review.commentAr : review.commentEn}"
                </p>
              </div>

              {review.highlightDishAr && (
                <div className="pt-3 border-t border-[#1e2230] flex items-center justify-between text-xs">
                  <span className="text-[#8e95a5]">{isAr ? 'الطبق الموصى به:' : 'Recommended:'}</span>
                  <span className="font-bold text-[#d4a373] bg-[#1a1d28] px-2.5 py-0.5 rounded-md border border-[#2b3042]">
                    {isAr ? review.highlightDishAr : review.highlightDishEn}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#12141e] border border-[#2c3246] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 left-4 sm:left-auto sm:right-4 text-[#8e95a5] hover:text-white p-1"
              >
                ✕
              </button>

              <h3 className="text-lg font-bold text-white mb-1 font-['Alexandria']">
                {isAr ? 'شاركنا تجربتك في طاسه جملي' : 'Share Your Experience'}
              </h3>
              <p className="text-xs text-[#8e95a5] mb-4">
                {isAr ? 'رأيك يسعدنا ويساعد زوارنا في اختيار أطباقهم المفضلة' : 'Your feedback inspires our craft'}
              </p>

              {submittedFeedback ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 animate-bounce" />
                  <div className="text-base font-bold text-white mb-1">
                    {isAr ? 'شكراً جزيلاً لتقييمك!' : 'Thank you for your review!'}
                  </div>
                  <div className="text-xs text-[#8e95a5]">
                    {isAr ? 'تم نشر مراجعتك بنجاح.' : 'Your feedback is live.'}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#c0c5d0] block mb-1">
                      {isAr ? 'اسمك الكريم:' : 'Your Name:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder={isAr ? 'مثال: محمد علي' : 'e.g. John Doe'}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#161924] border border-[#2a2f42] text-white text-sm focus:outline-none focus:border-[#d4a373]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#c0c5d0] block mb-1">
                      {isAr ? 'التقييم:' : 'Rating:'}
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating ? 'text-[#e5a93c] fill-[#e5a93c]' : 'text-[#3e445a]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#c0c5d0] block mb-1">
                      {isAr ? 'الطبق الذي جربته:' : 'Dish Tried:'}
                    </label>
                    <select
                      value={newDish}
                      onChange={(e) => setNewDish(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#161924] border border-[#2a2f42] text-white text-sm focus:outline-none focus:border-[#d4a373]"
                    >
                      <option value="طاسة كبدة جملي بلدي">{isAr ? 'طاسة كبدة جملي بلدي' : 'Camel Liver Skillet'}</option>
                      <option value="سجق جملي بيتي مخصوص">{isAr ? 'سجق جملي بيتي مخصوص' : 'Camel Sausage Skillet'}</option>
                      <option value="صينية مشويات طاسه جملي">{isAr ? 'صينية مشويات طاسه جملي' : 'Mixed Camel Grills'}</option>
                      <option value="حواوشي جملي مقرمش">{isAr ? 'حواوشي جملي مقرمش' : 'Crispy Camel Hawawshi'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#c0c5d0] block mb-1">
                      {isAr ? 'تفاصيل تجربتك ورأيك في الطعم والنظافة:' : 'Your Feedback:'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={isAr ? 'اكتب رأيك بصراحة...' : 'Share your honest feedback...'}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#161924] border border-[#2a2f42] text-white text-sm focus:outline-none focus:border-[#d4a373]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#d4a373] text-[#0b0c10] font-bold text-sm hover:bg-[#c49258] transition-colors cursor-pointer"
                  >
                    {isAr ? 'إرسال التقييم الآن' : 'Submit Review'}
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
