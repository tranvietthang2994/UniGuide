import { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";

interface UseBlogPostReturn {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useBlogPost = (slug: string): UseBlogPostReturn => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("useBlogPost - Fetching post with slug:", slug);

      const response = await fetch(`/api/blog/${slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch blog post");
      }

      console.log("useBlogPost - Received data:", data);

      setPost(data);
    } catch (err) {
      console.error("useBlogPost - Error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch blog post"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return {
    post,
    loading,
    error,
    refetch: fetchPost,
  };
};
