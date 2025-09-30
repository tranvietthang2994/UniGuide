import { useState, useEffect } from "react";
import { BlogPost, BlogListParams, BlogListResponse } from "@/types/blog";

interface UseBlogPostsReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  refetch: () => void;
}

export const useBlogPosts = (
  params: BlogListParams = {}
): UseBlogPostsReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(params.page || 1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("useBlogPosts - Fetching posts with params:", params);

      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set("page", params.page.toString());
      if (params.limit) searchParams.set("limit", params.limit.toString());
      if (params.category) searchParams.set("category", params.category);
      if (params.status) searchParams.set("status", params.status.toString());
      if (params.search) searchParams.set("search", params.search);
      if (params.universityId)
        searchParams.set("universityId", params.universityId.toString());

      const url = `/api/blog?${searchParams.toString()}`;
      console.log("useBlogPosts - Fetching from URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch blog posts");
      }

      const data: BlogListResponse = await response.json();

      console.log("useBlogPosts - Received data:", data);

      setPosts(data.posts);
      setTotal(data.total);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("useBlogPosts - Error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch blog posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [JSON.stringify(params)]);

  return {
    posts,
    loading,
    error,
    total,
    page,
    totalPages,
    refetch: fetchPosts,
  };
};
