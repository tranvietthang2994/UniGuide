import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/services/supabase-admin";

export async function GET(request: Request, context: any) {
  try {
    const { slug } = context.params as { slug: string };

    console.log("Blog Detail API - Fetching post with slug:", slug);

    const supabaseAdmin = getSupabaseAdmin();
    const { data: post, error } = await supabaseAdmin
      .from("posts")
      .select(
        `
        *,
        university(id, name, logo_url, short_name)
      `
      )
      .eq("slug", slug)
      .eq("status", 2) // Only published posts
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Transform post to match frontend interface (snake_case to camelCase)
    const transformedPost = {
      ...post,
      thumbnailUrl: post.thumbnail_url,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      universityId: post.university_id,
    };

    console.log("Blog Detail API - Fetched post:", transformedPost);
    return NextResponse.json(transformedPost);
  } catch (error) {
    console.error("Blog Detail API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
