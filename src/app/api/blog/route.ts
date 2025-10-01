import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/services/supabase-admin";
import { BlogListParams, BlogListResponse } from "@/types/blog";

export async function GET(request: Request) {
  try {
    console.log("Blog API - Request received");

    const { searchParams } = new URL(request.url);
    console.log(
      "Blog API - Search params:",
      Object.fromEntries(searchParams.entries())
    );

    // Parse query parameters
    const params: BlogListParams = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "6"),
      category: searchParams.get("category") || undefined,
      status: parseInt(searchParams.get("status") || "2"), // Default to published
      search: searchParams.get("search") || undefined,
      universityId: searchParams.get("universityId")
        ? parseInt(searchParams.get("universityId")!)
        : undefined,
    };

    console.log("Blog API - Parsed params:", params);

    const supabaseAdmin = getSupabaseAdmin();
    console.log("Blog API - Supabase admin client created");

    // Build query
    let query = supabaseAdmin
      .from("posts")
      .select(
        `
        *,
        university(id, name, logo_url)
      `
      )
      .eq("status", params.status);

    // Apply filters
    if (params.category) {
      query = query.eq("category", params.category);
    }

    if (params.universityId) {
      query = query.eq("university_id", params.universityId);
    }

    if (params.search) {
      query = query.ilike("title", `%${params.search}%`);
    }

    // Get total count for pagination (separate query)
    const { count } = await supabaseAdmin
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("status", params.status);
    const total = count || 0;

    // Apply pagination and ordering (use safe defaults)
    const page = params.page ?? 1;
    const limit = params.limit ?? 6;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    console.log("Blog API - Executing query with range:", { from, to });

    const { data: posts, error } = await query
      .order("published_at", { ascending: false })
      .range(from, to);

    console.log("Blog API - Query result:", { posts: posts?.length, error });

    if (error) {
      console.error("Error fetching blog posts:", error);
      return NextResponse.json(
        { error: "Failed to fetch blog posts" },
        { status: 500 }
      );
    }

    // Transform posts to match frontend interface (snake_case to camelCase)
    const transformedPosts = (posts || []).map((post: any) => ({
      ...post,
      thumbnailUrl: post.thumbnail_url,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      universityId: post.university_id,
    }));

    const response: BlogListResponse = {
      posts: transformedPosts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    console.log("Blog API - Fetched posts:", response);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Blog API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
