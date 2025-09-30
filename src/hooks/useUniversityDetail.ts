import { useState, useEffect, useCallback } from "react";
import { universityAPI, University } from "@/lib/api/universities";

interface UseUniversityDetailResult {
  university: University | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUniversityDetail(
  universityId: number
): UseUniversityDetailResult {
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUniversity = useCallback(async () => {
    if (!universityId) {
      setError("Invalid university ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await universityAPI.getUniversityById(universityId);

      if (response.success) {
        setUniversity(response.data);
      } else {
        setError(response.error || "Failed to fetch university details");
      }
    } catch (err) {
      console.error("Error fetching university:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [universityId]);

  useEffect(() => {
    fetchUniversity();
  }, [fetchUniversity]);

  const refetch = useCallback(() => {
    fetchUniversity();
  }, [fetchUniversity]);

  return {
    university,
    loading,
    error,
    refetch,
  };
}

