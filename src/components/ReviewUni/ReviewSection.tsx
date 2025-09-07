"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  StarIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Review } from "./universityDataReview";

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  averageRating,
}) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]; // 1-5 stars
    reviews.forEach((review) => {
      const starIndex = Math.floor(review.rating) - 1;
      if (starIndex >= 0 && starIndex < 5) {
        distribution[starIndex]++;
      }
    });
    return distribution.reverse(); // 5-1 stars for display
  };

  const ratingDistribution = getRatingDistribution();
  const maxCount = Math.max(...ratingDistribution);

  const StarRating: React.FC<{ rating: number; size?: string }> = ({
    rating,
    size = "h-5 w-5",
  }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIconSolid
            key={star}
            className={`${size} ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (!reviews.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Đánh giá sinh viên
          </h2>
        </div>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Chưa có đánh giá
          </h3>
          <p className="text-gray-500">
            Hãy là người đầu tiên đánh giá trường này
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Đánh giá sinh viên</h2>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Overall Rating */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
            <div className="text-5xl font-bold text-blue-600">
              {averageRating.toFixed(1)}
            </div>
            <div>
              <StarRating rating={averageRating} size="h-6 w-6" />
              <p className="text-gray-600 mt-1">
                Dựa trên {reviews.length} đánh giá
              </p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map((count, index) => {
            const starLevel = 5 - index;
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

            return (
              <div key={starLevel} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-6">{starLevel}</span>
                <StarIconSolid className="h-4 w-4 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Đánh giá chi tiết
        </h3>

        <div className="space-y-4">
          {displayedReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <UserCircleIcon className="h-10 w-10 text-gray-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{review.user}</h4>
                    <StarRating rating={review.rating} size="h-4 w-4" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {reviews.length > 3 && (
          <div className="text-center">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors"
            >
              {showAllReviews ? (
                <>Ẩn bớt đánh giá</>
              ) : (
                <>Xem thêm {reviews.length - 3} đánh giá</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Rating Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {reviews.filter((r) => r.rating >= 4).length}
          </div>
          <p className="text-sm text-green-700">Đánh giá tích cực</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {reviews.filter((r) => r.rating >= 3 && r.rating < 4).length}
          </div>
          <p className="text-sm text-yellow-700">Đánh giá trung bình</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">
            {reviews.filter((r) => r.rating < 3).length}
          </div>
          <p className="text-sm text-red-700">Cần cải thiện</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
