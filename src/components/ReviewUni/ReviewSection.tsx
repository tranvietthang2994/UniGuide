"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { StarIcon, PlusIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Review, CreateReviewData } from "@/lib/api/universities";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/Auth/AuthModal";

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  universityId: number;
  onCreateReview: (reviewData: CreateReviewData) => Promise<boolean>;
  creating: boolean;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  averageRating,
  totalReviews,
  universityId,
  onCreateReview,
  creating,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await onCreateReview({
      rating: newReview.rating,
      comment: newReview.comment.trim() || undefined,
    });

    if (success) {
      setShowReviewForm(false);
      setNewReview({ rating: 5, comment: "" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <StarIcon className="h-6 w-6 text-yellow-600" />
        <h2 className="text-2xl font-bold text-gray-900">Đánh giá</h2>
      </div>

      {/* Rating Summary */}
      <div className="mb-8 p-6 bg-yellow-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-3xl font-bold text-yellow-600">
                {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">Dựa trên {totalReviews} đánh giá</p>
          </div>

          {isAuthenticated && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              Viết đánh giá
            </button>
          )}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 p-6 border border-gray-200 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Viết đánh giá của bạn</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đánh giá sao
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none"
                  >
                    <StarIconSolid
                      className={`h-8 w-8 ${
                        star <= newReview.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {newReview.rating}/5 sao
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nhận xét (tùy chọn)
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                rows={4}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Chia sẻ trải nghiệm của bạn về trường này..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {newReview.comment.length}/500 ký tự
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? "Đang gửi..." : "Gửi đánh giá"}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.user}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(review.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {review.rating}/5
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              {review.comment && (
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              )}
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Chưa có đánh giá nào
            </h3>
            <p className="text-gray-500">
              Hãy là người đầu tiên đánh giá trường này!
            </p>
          </div>
        )}
      </div>

      {!isAuthenticated && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-center">
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Đăng nhập
            </button>{" "}
            để viết đánh giá của bạn
          </p>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultView="login"
      />
    </div>
  );
};

export default ReviewSection;
