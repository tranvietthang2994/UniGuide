import { useState, useEffect, useCallback } from "react";
import {
  universityAPI,
  University,
  UniversityListParams,
} from "@/lib/api/universities";

interface UseUniversitiesResult {
  universities: University[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  refetch: () => void;
  setParams: (params: UniversityListParams) => void;
}

export function useUniversities(
  initialParams: UniversityListParams = {}
): UseUniversitiesResult {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null>(null);
  const [params, setParams] = useState<UniversityListParams>(initialParams);

  const fetchUniversities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Hook: Fetching universities with params:", params);

      const response = await universityAPI.getUniversities(params);

      console.log("Hook: API response:", {
        success: response.success,
        dataLength: response.data?.length,
        pagination: response.pagination,
      });

      if (response.success) {
        setUniversities(response.data);
        setPagination(response.pagination || null);
      } else {
        setError(response.error || "Failed to fetch universities");
      }
    } catch (err) {
      console.error("Error fetching universities:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  const refetch = useCallback(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  const updateParams = useCallback((newParams: UniversityListParams) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  return {
    universities,
    loading,
    error,
    pagination,
    refetch,
    setParams: updateParams,
  };
}
