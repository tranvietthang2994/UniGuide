import { useState, useCallback } from "react";
import {
  universityAPI,
  Review,
  ReviewListParams,
  CreateReviewData,
} from "@/lib/api/universities";

interface UseReviewsResult {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  averageRating: number;
  totalReviews: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  createReview: (reviewData: CreateReviewData) => Promise<boolean>;
  fetchReviews: (params?: ReviewListParams) => Promise<void>;
  creating: boolean;
}

export function useReviews(universityId: number): UseReviewsResult {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null>(null);

  const fetchReviews = useCallback(
    async (params: ReviewListParams = {}) => {
      try {
        setLoading(true);
        setError(null);

        const response = await universityAPI.getUniversityReviews(
          universityId,
          params
        );

        if (response.success) {
          setReviews(response.data.reviews);
          setAverageRating(response.data.averageRating);
          setTotalReviews(response.data.totalReviews);
          setPagination(response.data.pagination);
        } else {
          setError(response.error || "Failed to fetch reviews");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    },
    [universityId]
  );

  const createReview = useCallback(
    async (reviewData: CreateReviewData): Promise<boolean> => {
      try {
        setCreating(true);
        setError(null);

        const response = await universityAPI.createReview(
          universityId,
          reviewData
        );

        if (response.success) {
          // Add new review to the beginning of the list
          setReviews((prev) => [response.data, ...prev]);
          setTotalReviews((prev) => prev + 1);

          // Recalculate average rating
          const newTotalRating =
            averageRating * totalReviews + reviewData.rating;
          const newAverageRating = newTotalRating / (totalReviews + 1);
          setAverageRating(newAverageRating);

          return true;
        } else {
          // Handle duplicate review error from API
          const friendly =
            response.error === "You have already reviewed this university"
              ? "Bạn đã đánh giá trường này trước đó"
              : response.error || "Không thể tạo đánh giá";
          setError(friendly);
          return false;
        }
      } catch (err) {
        console.error("Error creating review:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        return false;
      } finally {
        setCreating(false);
      }
    },
    [universityId, averageRating, totalReviews]
  );

  return {
    reviews,
    loading,
    error,
    averageRating,
    totalReviews,
    pagination,
    createReview,
    fetchReviews,
    creating,
  };
}
