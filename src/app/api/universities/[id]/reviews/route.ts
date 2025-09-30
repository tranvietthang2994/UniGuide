import { NextResponse } from "next/server";
import supabase from "../../../../../../services/supabase";
import { getUserFromRequest } from "@/lib/auth";

// GET - Fetch reviews for a university
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    if (!id) {
      return NextResponse.json(
        { error: "University ID is required" },
        { status: 400 }
      );
    }

    // Get reviews with pagination
    const { data: reviews, error } = await supabase
      .from("review")
      .select(
        `
        id,
        rating,
        comment,
        created_at,
        user(id, fullname)
      `
      )
      .eq("university_id", id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Reviews fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 }
      );
    }

    // Get total count
    const { count, error: countError } = await supabase
      .from("review")
      .select("*", { count: "exact", head: true })
      .eq("university_id", id);

    if (countError) {
      console.error("Reviews count error:", countError);
    }

    // Calculate average rating
    const { data: allReviews, error: avgError } = await supabase
      .from("review")
      .select("rating")
      .eq("university_id", id);

    let averageRating = 0;
    if (!avgError && allReviews && allReviews.length > 0) {
      averageRating =
        allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    }

    return NextResponse.json({
      success: true,
      data: {
        reviews:
          reviews?.map((r: any) => ({
            id: r.id,
            user: r.user?.fullname || "Anonymous",
            rating: r.rating,
            comment: r.comment,
            createdAt: r.created_at,
          })) || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
        averageRating,
        totalReviews: count || 0,
      },
    });
  } catch (error) {
    console.error("Reviews API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create a new review
export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const user = getUserFromRequest(request as any);

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: "University ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { rating, comment } = body;

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (comment && comment.length > 500) {
      return NextResponse.json(
        { error: "Comment must be less than 500 characters" },
        { status: 400 }
      );
    }

    // Check if user has already reviewed this university
    const { data: existingReview, error: checkError } = await supabase
      .from("review")
      .select("id")
      .eq("university_id", id)
      .eq("user_id", user.userId)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Review check error:", checkError);
      return NextResponse.json(
        { error: "Failed to check existing review" },
        { status: 500 }
      );
    }

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this university" },
        { status: 409 }
      );
    }

    // Create new review
    const { data: newReview, error: insertError } = await supabase
      .from("review")
      .insert([
        {
          university_id: parseInt(id),
          user_id: user.userId,
          rating: parseFloat(rating),
          comment: comment || null,
        },
      ])
      .select(
        `
        id,
        rating,
        comment,
        created_at,
        user(id, fullname)
      `
      )
      .single();

    if (insertError) {
      console.error("Review insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create review" },
        { status: 500 }
      );
    }

    // Update university average rating
    await updateUniversityRating(parseInt(id));

    const userField = (newReview as any)?.user;
    const userFullname = Array.isArray(userField)
      ? userField[0]?.fullname
      : userField?.fullname;

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newReview.id,
          user: userFullname || "Anonymous",
          rating: newReview.rating,
          comment: newReview.comment,
          createdAt: newReview.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create review API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to update university average rating
async function updateUniversityRating(universityId: number) {
  try {
    const { data: reviews, error } = await supabase
      .from("review")
      .select("rating")
      .eq("university_id", universityId);

    if (error || !reviews || reviews.length === 0) {
      return;
    }

    const averageRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await supabase
      .from("university")
      .update({ rating: averageRating })
      .eq("id", universityId);
  } catch (error) {
    console.error("Failed to update university rating:", error);
  }
}
